const Realm = require('realm-web')
const {APPID} = require("./environment")

console.log(APPID)
const app = new Realm.App({
    id: APPID,
});

module.exports = app;