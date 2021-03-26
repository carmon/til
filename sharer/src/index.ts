const config = require('dos-config');
const Twitter = require('twitter-lite');

const { env } = require('process');

const app = new Twitter({
  consumer_key: config.consumer.key,
  consumer_secret: config.consumer.secret,
  access_token_key: config.access_token.key,
  access_token_secret: config.access_token.secret
});

const getStatusPayload = () => ({
  status: `New blog post: ${env['TITLE']} in https://til.vercel.app/`
});

app.get("account/verify_credentials")
  .then(() => {
    app
      .post("statuses/update", getStatusPayload())
      .catch(console.error);
  })
  .catch(console.error);
