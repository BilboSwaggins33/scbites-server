const Realm = require('realm-web')
const {APPID} = require("./environment")

const app = new Realm.App({
    id: APPID,
});

//https://scbites-server-ae26174ba77b.herokuapp.com/

module.exports = app;