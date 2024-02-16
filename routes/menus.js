const cheerio = require('cheerio');
const axios = require('axios')

const {MENU_BASE_URL} = require('../utils/environment')
const ejs = require('ejs')
const mongoClient = require("../utils/mongoClient")
const {LegendConstantsFlipped, LocationsFlipped, Locations} = require("../constants/legend")
const transporter = require("../utils/sesClient")
const path = require('path')

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
            let tags = item.find("i").map(function (i, v) {
                return $(v).text()
            }).get()
            menuItems.push({
                name: item.first().contents().filter(function () {
                    return this.type === 'text';
                }).text(), tags: tags, location: LocationsFlipped[location]
            })
        })
        return menuItems
    } catch (e) {
        console.log(e)
    }

}



//FEATURE switch to pdf form
async function sendEmails() {
    const userData = await grabUserData();
    const parksideItems = await scrape(Locations.PARKSIDE);
    const villageItems = await scrape(Locations.VILLAGE);
    const evkItems = await scrape(Locations.EVK);

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

            const emailData = [...new Set([
                ...keywordParkside,
                ...keywordVillage,
                ...keywordEvk,
                ...foundParkside,
                ...foundVillage,
                ...foundEvk
            ])]





            ejs.renderFile(path.resolve(__dirname, '../views/emailTemplate.ejs'), {emailData: emailData, userData: user, legend: LegendConstantsFlipped}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {

                    transporter.sendMail(
                        {
                            from: "scbitesinfo@gmail.com",
                            to: user.email,
                            subject: "Your daily scbite.",
                            html: data
                        },
                        (err) => {
                            console.log("error:", err)
                        }
                    );
                }
            })


        }

    }

}


module.exports = {sendEmails};
