const dev_client = require('./client/dev_client.js');
const user_client = require('./client/user_client.js');

const {ETwitterStreamEvent} = require('twitter-api-v2');

async function main() {

    //user
    // const user = await user_client.v2.me();
    // console.log(user);

    let user_id = process.env.USER_ID;

    const rules = await dev_client.v2.streamRules();
    console.log(rules);

};

main();