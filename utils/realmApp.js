const Realm = require('realm-web')
const atlasConfig = require("./atlasConfig.json")

const {appId} = atlasConfig;

const app = new Realm.App({
    id: appId,
});

module.exports = app;