require('dotenv').config()
const {Client} = require('twitter-api-sdk');

const user_client = new Client({
    appKey: process.env.APP_KEY,
    appSecret: process.env.APP_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCES_SECRET,
  });

  module.exports = user_client;
