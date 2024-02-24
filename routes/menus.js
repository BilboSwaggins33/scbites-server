const cheerio = require('cheerio');
const axios = require('axios')

const {MENU_BASE_URL} = require('../utils/environment')
const ejs = require('ejs')
const mongoClient = require("../utils/mongoClient")
const {LegendConstantsFlipped, LocationsFlipped, Locations} = require("../constants/legend")
const transporter = require("../utils/sesClient")
const path = require('path')
const fs = require('fs')
const puppeteer = require('puppeteer')


async function grabUserData() {

    try {

        await mongoClient.connect()

        const database = mongoClient.db("data");

        const keywordsCollection = database.collection("Keywords");
        const userCollection = database.collection("Users");

        const users = await userCollection.find();

        let dataSnapshot = [];

        for await (let doc of users) {
            const uid = doc.owner_id;
            doc['keywords'] = await keywordsCollection.find({owner_id: uid}).toArray();
            dataSnapshot.push(doc);
        }

        return dataSnapshot
    } finally {
        await mongoClient.close();
    }
}

function includesTag(arr, userTags) {
    for (let i = 0; i < arr.length; i++) {
        let t = LegendConstantsFlipped[arr[i]];
        if (userTags[t]) {
            return true;
        }
    }
    return false
}


async function scrape(location) {
    try {
        let currentDate = new Date().toLocaleDateString();
        const {data} = await axios.get(`${MENU_BASE_URL}${location}&menu_date=${currentDate}`);
        const $ = cheerio.load(data);
        const menuElements = $("ul.menu-item-list > li");
        let menuItems = []
        menuElements.each((idx, el) => {

            const item = $(el)

            const mealTypeParent = item.parentsUntil('div.col-sm-6 col-md-4');
            const mealTypeChild = mealTypeParent.children('h3.menu-venue-title');
            const mealTypeText = mealTypeChild.first().contents().filter(function () {
                return this.type === 'text';
            }).text()


            let tags = item.find("i").map(function (i, v) {
                return $(v).text()
            }).get()
            menuItems.push({
                name: item.first().contents().filter(function () {
                    return this.type === 'text';
                }).text(), tags: tags, location: LocationsFlipped[location], meal: mealTypeText
            })
        })
        return menuItems
    } catch (e) {
        console.log(e)
    }

}


//FEATURE switch to pdf form
async function sendEmails() {
    const villagepic = fs.readFileSync(`${process.cwd()}/public/images/village_dining.jpg`).toString('base64')
    const evkpic = fs.readFileSync(`${process.cwd()}/public/images/evk_dining.jpg`).toString('base64')
    const parksidepic = fs.readFileSync(`${process.cwd()}/public/images/parkside_dining.jpg`).toString('base64')
    const pics = {
        parkside: parksidepic,
        evk: evkpic,
        village: villagepic
    }

    const userData = await grabUserData();
    const parksideItems = await scrape(Locations.PARKSIDE);
    const villageItems = await scrape(Locations.VILLAGE);
    const evkItems = await scrape(Locations.EVK);


    let browser;
    browser = await puppeteer.launch({
        'args' : [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const [page] = await browser.pages();

    for (let user of userData) {
        if (user.isActive) {
            let foundParkside = parksideItems.filter((item) => {
                return includesTag(item.tags, user.tags)
            })

            let foundVillage = villageItems.filter((item) => {
                return includesTag(item.tags, user.tags)
            })

            let foundEvk = evkItems.filter((item) => {
                return includesTag(item.tags, user.tags)
            })

            let keywordParkside = parksideItems.filter((item) => {
                return user.keywords.some((word) =>
                    item.name.toUpperCase().includes(word.summary.toUpperCase()) ||
                    word.summary.toUpperCase().includes(item.name.toUpperCase()))
            })

            let keywordVillage = villageItems.filter((item) => {
                return user.keywords.some((word) =>
                    item.name.toUpperCase().includes(word.summary.toUpperCase()) ||
                    word.summary.toUpperCase().includes(item.name.toUpperCase()))
            })

            let keywordEvk = evkItems.filter((item) => {
                return user.keywords.some((word) =>
                    item.name.toUpperCase().includes(word.summary.toUpperCase()) ||
                    word.summary.toUpperCase().includes(item.name.toUpperCase()))
            })

            const emailData = [
                ...keywordParkside,
                ...keywordVillage,
                ...keywordEvk,
                ...foundParkside,
                ...foundVillage,
                ...foundEvk
            ]

            function isDuplicate(entry, arr) {
                return arr.some(x => (entry.name === x.name) && (entry.location === x.location))
            }

            let uniqueData = [];

            for (const item of emailData) {
                if (!isDuplicate(item, uniqueData)) {
                    uniqueData.push(item);
                }
            }

            const html = await ejs.renderFile(path.resolve(__dirname, '../views/template.ejs'),
                {emailData: uniqueData, userData: user, legend: LegendConstantsFlipped, pic: pics});
            await page.setContent(html);
            //await page.addStyleTag({path: path.resolve(__dirname, '../public/stylesheets/template.css')})

            const pdf = await page.pdf({printBackground: true});

            try {
                transporter.sendMail(
                    {
                        from: "scbitesinfo@gmail.com",
                        to: user.email,
                        subject: "Your daily bite.",
                        attachments: [{
                            filename: "menu.pdf",
                            content: pdf
                        }]
                    },
                    (err) => {
                        console.log("error:", err)
                    }
                );
            } catch {
                console.log(err)
            }


        }

    }

    await browser?.close();

}


module.exports = {sendEmails};
