<div align="center">

# Tweets as an Image
  
_To get recent tweets as an image of any user_
</div>

---

This project is created using [Canvas](https://www.npmjs.com/package/canvas), [Puppeteer](https://github.com/puppeteer/puppeteer), and [Twitter API](https://developer.twitter.com/en/docs), initially created  for integration with [Github Profilinator](https://github.com/rishavanand/github-profilinator)( P.S. You can use it anywhere you want to add your Tweets in Image format :wink: ).


_Note: The Heroku Dyno might be in Sleep mode, so retry after a few minutes in case the API didn't respond on first call_



## Blog

<a href="https://dev.to/starkblaze01/tweets-as-an-image-5fmh" target="_blank">
  <img src=https://img.shields.io/badge/dev.to-%2308090A.svg?&style=for-the-badge&logo=dev.to&logoColor=white alt=devto style="margin-bottom: 5px;" />
</a>



<br/>

## Version 1:

### APIs available for use:

- `https://tweets-as-an-image.herokuapp.com/?twitterHandle={your_twitter_handle_here}`  (Default count value: 1)
- `https://tweets-as-an-image.herokuapp.com/?twitterHandle={your_twitter_handle_here}&count={number_of_tweets_you_want_to_fecth}`

Replace `your_twitter_handle_here` and `number_of_tweets_you_want_to_fecth` accordingly.

<br/>

### Note:
- Retweets and comments are ignored.
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


### Sample Query Response for v1:
<img src="https://tweets-as-an-image.herokuapp.com/?twitterHandle=starkblaze01&count=1"/>

## Version 2:

### API available for use:
 - `https://tweets-as-an-image.herokuapp.com/tweet?twitterHandle={your_twitter_handle}`
 - `https://tweets-as-an-image.herokuapp.com/tweet?twitterHandle={your_twitter_handle}&id={your_tweet_id}&theme={light_or_dark}&maxwidth={max_width_of_your_tweet_image}&height={height_of_the_image}&lang={language}`
 
 #### Optional Query Arguements:
 - `id`(User's Tweet ID, Default: user's last tweet)
 - `theme` (light or dark, Default: dark)
 - `maxwidth` (maxWidth of your tweet image(+10px for border will be added), Default: 550)
 - `height` (height of the image, Default: Min(2000, Height of your tweet))
 - `lang` (Languages Supported by twitter, check [here](https://developer.twitter.com/en/docs/twitter-for-websites/supported-languages), Default: en)
 
 ### Note:
 - This project is using oembed response of the tweets, and the height of the any tweets are not fixed, as there can be media content too, so it is not returned in the response. Read more about it [here](https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/get-statuses-oembed). I am evaluating the height in the puppeteer itself, which is set to Minimum of 2000px and Height of Your Tweet. If you want to clip the part of the tweet, you can pass height as an optional query.
 - I am using [Puppeteer](https://github.com/puppeteer/puppeteer), a headless Chromium based browser to load the oembed response and take the screenshot of it.
 - The Deployement part on heroku is same as the above one, but you need to add `puppeteer buildpack` in the deployement. You can know more about that [here](https://github.com/jontewks/puppeteer-heroku-buildpack)

### Sample Query Response of v2:

#### Default Response:
<img src="https://tweets-as-an-image.herokuapp.com/tweet?twitterHandle=StarkBlaze01" />

#### Response with maxwidth set to 400, language to Spanish
<img src="https://tweets-as-an-image.herokuapp.com/tweet?twitterHandle=StarkBlaze01&lang=es&maxwidth=400" />

Liked the project? Hit the star button to support!

Found a bug ? Create an issue [here](https://github.com/starkblaze01/Tweets-as-an-Image/issues/new)
