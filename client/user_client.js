require('dotenv').config()
const {XApi} = require('twitter-api-v2');

const user_client = new XApi({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCES_SECRET,
});

module.exports = user_client;
