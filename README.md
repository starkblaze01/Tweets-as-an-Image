<div align="center">
# Tweets as an Image
To get recent tweets as an image of any user
</div>
<br/>

This project is created using [Canvas](https://www.npmjs.com/package/canvas) and [Twitter API](https://developer.twitter.com/en/docs)  for integration with [Github Profilinator](https://github.com/rishavanand/github-profilinator).

<br/>
APIs available for use:

- `https://tweets-as-an-image.herokuapp.com/?twitterHandle={your_twitter_handle_here}`  (Default count value: 1)
- `https://tweets-as-an-image.herokuapp.com/?twitterHandle={your_twitter_handle_here}&count={number_of_tweets_you_want_to_fecth}`

Replace `your_twitter_handle_here` and `number_of_tweets_you_want_to_fecth` accordingly.

<br/>

- Using Twitter API requires [developer account](https://developer.twitter.com/en/apply-for-access) and
there's a rate limit over Twitter API usage which is 900 per user and 1500 per app with a window length of 15 minutes. Find more [here](https://developer.twitter.com/en/docs/twitter-api/v1/rate-limits).
- So, for personal usage kindly please fork this repo and set up your own server on herokuapp
<br/>

**Steps to deploy your own fork:**
1. Create Developer Account on twitter.
2. Register your app.
3. [Generate Bearer Token](https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens).
4. Link your github repository on [Heroku](https://www.heroku.com/).
5. Set [environment variable](https://devcenter.heroku.com/articles/config-vars) TWITTER_OAUTH_TOKEN="Your bearer auth token".
6. :tada: Copy the deployed project and use it.(P.S. Don't forget to add twitter handle and count query at the end of url).


### Sample Query Image:
<img src="https://tweets-as-an-image.herokuapp.com/?twitterHandle=starkblaze01&count=1"/>

### Futute Work:
- Make font and gradient customizable.
- Better parsing of tweets' Text.
