const dev_client = require('./client/dev_client.js');
const user_client = require('./client/user_client.js');
const openai = require('./client/openai.js');

const {ETwitterStreamEvent} = require('twitter-api-sdk');
  
const nicknames = ["IbaiLlanos", "TheGrefg", "elonmusk"];

async function user_data(nick_name) {
  try {
    // User info
    const user = await dev_client.users.findUserByUsername(nick_name, {
      'user.fields': ['id', 'name', 'username', 'most_recent_tweet_id'],
      'expansions': ['most_recent_tweet_id']
    });

    console.log("User Info:", JSON.stringify(user.data, null, 2));

    // Last tweet id
    let lastTweetId = user.data.most_recent_tweet_id;

    // Tweet details
    if (user.includes && user.includes.tweets && user.includes.tweets.length > 0) {
      const lastTweet = user.includes.tweets[0];
      console.log("Last Tweet Details:", JSON.stringify(lastTweet, null, 2));

      // Search if its an answer
      if (lastTweet.text.startsWith('@')) {
        console.log("El tweet es una respuesta y será descartado.");
        return null;
      } else {
        console.log("El tweet no es una respuesta. ID del Tweet:", lastTweetId);
        return { id: lastTweetId, text: lastTweet.text }; // Return data if its not an answer
      }
    } else {
      console.log("No se encontró un tweet asociado.");
      return null;
    }

  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

async function answerTweet(tweetId, tweetText) {
  try {
    let response_text = '';
    // creamos el prompt inicial "one show prompt" con un chat de ejemplo para dar contexto a openai
    const one_shot_prompt = 'Twitter Bot: Preguntame algo sobre Javascript. '+
    'Yo: Claro, Cuando se creó el lenguaje javascript? '+
    'Twitter Bot: El lenguaje se creó en 1995. '+
    'Yo: '+ tweetText;

    try{  

        // gpt-4o-mini
        const completion = await openai.chat.completions.create({
            model: 'gpt-3o-mini',
            prompt: one_shot_prompt,
            temperature: 0.5,
            max_tokens: 250,
            top_p: 1.0,
            stop: ["Yo:"]
        });
        response_text = completion.data.choices[0].text

        //dall-e
        // const response = await openai.createImage({
        //     prompt: clear_text,
        //     n: 1,
        //     size: '1024x1024'
        // });
        // response_text = response.data.data[0].url;
        
    }catch(error){
        console.log(error);
    }

    // Answer tweet
    let tweet_response = await dev_client.tweets.createTweet({
      in_reply_to_tweet_id: tweetId,
      text: response_text
    });

    console.log("Respuesta enviada:", JSON.stringify(tweet_response.data, null, 2));
  } catch (error) {
    console.error('Error enviando la respuesta:', error);
  }
}


async function main() {
  user_data(nicknames[1]).then(({ id: tweetId, text: tweetText }) => {
    if (tweetId) {
      console.log("Tweet ID:", tweetId);
      console.log("Tweet Text:", tweetText);
  
      answerTweet(tweetId, tweetText);
    } else {
      console.log("No se encontró un tweet adecuado para responder.");
    }
  }).catch(error => {
    console.error("Error:", error);
  });
};

main();