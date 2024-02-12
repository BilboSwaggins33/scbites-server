const Realm = require('realm-web')
const {APPID} = require("./environment")


const app = new Realm.App({
    id: APPID,
});

module.exports = app;