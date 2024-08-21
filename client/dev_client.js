require('dotenv').config()
const {XApi} = require('twitter-api-v2');

const dev_client = new XApi(process.env.APP_TOKEN);

module.exports = dev_client;