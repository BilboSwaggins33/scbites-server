const { MongoClient } = require("mongodb");

const {MONGO_CLIENT_URL} = require('./environment')
const client = new MongoClient(MONGO_CLIENT_URL);

module.exports = client;