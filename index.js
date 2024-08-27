const dev_client = require('./client/dev_client.js');
const user_client = require('./client/user_client.js');

const {ETwitterStreamEvent} = require('twitter-api-v2');
  


// async function user_data(nick_name) {
//   // const user = await dev_client.v2.userByUsername(nick_name);
//   // const userId = user.data;
//   const response = await dev_client.users.findUsersById({

//     "ids": [

//         "2754746065"

//     ],

//     "expansions": [

//         "most_recent_tweet_id"

//     ]

//   });

  

//   console.log("response", JSON.stringify(response, null, 2));

// }

async function replyToTweet(tweetId, message) {
  try {
    // Publica un tweet en respuesta a otro tweet usando la API v2
    const tweet = await user_client.v2.tweet({
      text: message,
      reply: {
        in_reply_to_tweet_id: tweetId, // ID del tweet al que estás respondiendo
      },
    });

    console.log('Tweet enviado:', tweet);
  } catch (error) {
    console.error('Error al enviar el tweet:', error);
  }
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

    //replyToTweet('1828373871512207397', "Queso")
    // user_data("IbaiLLanos")
};

main();