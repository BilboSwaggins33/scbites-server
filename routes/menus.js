const cheerio = require('cheerio');
const axios = require('axios')

const {BASE_URL} = require('../utils/environment')

const base_url = BASE_URL;
const mongoClient = require("../utils/mongoClient")
const {LegendConstantsFlipped, LocationsFlipped, Locations} = require("../constants/legend")
const transporter = require("../utils/sesClient")
const Mailgen = require('mailgen')

let mailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'scbites',
        link: 'https://mailgen.js/'
        // logo: 'https://mailgen.js/img/logo.png'
    }
});

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
        const {data} = await axios.get(`${base_url}${location}&menu_date=${currentDate}`);
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


async function sendEmails() {
    const userData = await grabUserData();
    const parksideItems = await scrape(Locations.PARKSIDE);
    const villageItems = await scrape(Locations.VILLAGE);
    const evkItems = await scrape(Locations.EVK);

    for (let user of userData) {
        if (user.isActive) {


            let foundParkside = parksideItems.filter((item) => {
                return includesTag(item.tags, user.tags) ||
                    user.keywords.some((word) =>
                        item.name.toUpperCase().includes(word.summary.toUpperCase()) ||
                        word.summary.toUpperCase().includes(item.name.toUpperCase()))
            })

            let foundVillage = villageItems.filter((item) => {
                return includesTag(item.tags, user.tags) ||
                    user.keywords.some((word) =>
                        item.name.toUpperCase().includes(word.summary.toUpperCase()) ||
                        word.summary.toUpperCase().includes(item.name.toUpperCase()))
            })

            let foundEvk = evkItems.filter((item) => {
                return includesTag(item.tags, user.tags) ||
                    user.keywords.some((word) =>
                        item.name.toUpperCase().includes(word.summary.toUpperCase()) ||
                        word.summary.toUpperCase().includes(item.name.toUpperCase()))
            })

            const emailData = [
                ...foundParkside,
                ...foundVillage,
                ...foundEvk
            ]

            let emailFormat = {
                body: {
                    intro: "Don't miss your next bite! Here are your dishes today and where you can find them!",
                    table: {
                        data: emailData,
                        columns: {
                            // Optionally, customize the column widths
                            customWidth: {
                                name: '30%',
                                tags: '60%'
                            },
                            // Optionally, change column text alignment
                            customAlignment: {
                                location: 'right'
                            }
                        }
                    },
                    outro: 'Have questions, feedback, or need help? Email us at scbitesinfo@gmail.com, we\'d love to help.  \n Visit our website to unsubscribe.'
                }
            };

            let emailBody = mailGenerator.generate(emailFormat);

            transporter.sendMail(
                {
                    from: "scbitesinfo@gmail.com",
                    to: user.email,
                    subject: "Your daily scbite.",
                    html: emailBody,
                    ses: {
                        // optional extra arguments for SendRawEmail
                        Tags: [
                            {
                                Name: "tag_name",
                                Value: "tag_value",
                            },
                        ],
                    },
                },
                (err) => {
                    console.log("error:", err)
                }
            );

        }

    }

}


module.exports = {sendEmails};
