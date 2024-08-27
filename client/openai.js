require('dotenv').config();

// OpenAI Client
const { OpenAI, OpenAIApi } = require('openai');

const openai = new OpenAI();

module.exports = openai;