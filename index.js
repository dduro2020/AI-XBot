const dev_client = require('./client/dev_client.js');
const user_client = require('./client/user_client.js');

const {ETwitterStreamEvent} = require('twitter-api-v2');
  


async function user_id() {
    // const user = await dev_client.v2.userByUsername('IbaiLLanos');
    // const userId = user.data.id;
    // console.log(`ID del usuario IbaiLLanos: ${userId}`);

}

async function simple_tweet(tweet) {
    try {
        // Publicar primer tweet
        const response1 = await user_client.v2.tweet(tweet);
        console.log('Tweet:', response1.data);
        const tweetId1 = response1.data.id;
        console.log(`Tweet id: ${tweetId1}`);
    
      } catch (error) {
        console.error('Error en la operación:', error);
      }
}

async function main() {
    // 1. Obtener el ID de usuario
    const user = await user_client.v2.me();
    const userId = user.data.id;
    console.log(`Tu ID de usuario: ${userId}`);

    simple_tweet("Judías")
};

main();