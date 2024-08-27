require('dotenv').config()
const {Client} = require('twitter-api-sdk');

const dev_client = new Client(process.env.APP_TOKEN);

module.exports = dev_client;