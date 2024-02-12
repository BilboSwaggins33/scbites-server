require('dotenv').config()

module.exports = {

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    MONGO_CLIENT_URL: process.env.MONGO_CLIENT_URL,
    MENU_BASE_URL: process.env.MENU_BASE_URL,

    DEVELOPMENT_CLIENT_URL: process.env.DEVELOPMENT_CLIENT_URL,
    PRODUCTION_CLIENT_URL: process.env.PRODUCTION_CLIENT_URL,
    APPID: process.env.APPID

}
