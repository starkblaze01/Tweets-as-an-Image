var express = require("express");
var app = express();
require("dotenv").config();
const request = require("request");
const { createCanvas } = require("canvas");
const puppeteer = require("puppeteer");
const redis = require("redis");
let redisClient;

(async () => {
  console.log(process.env.REDIS_PASSWORD)
  console.log(process.env.REDIS_ENDPOINT_URI)
  console.log(process.env.TWITTER_OAUTH_TOKEN)
  redisClient = redis.createClient({ url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_ENDPOINT_URI}` });
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

let browser;

(async () => {
  browser = await puppeteer.launch({ args: ["--no-sandbox"] });
})();

//error canvas
const canvas1 = createCanvas(500, 500);
var ctx1 = canvas1.getContext("2d");
ctx1.font = "15px Verdana";
ctx1.fillText("Oops! Not Found", 50, 50);

app.get("/live", function (req, res) {
  res.send("Hello World");
});

app.get("/", function (req, res) {
  let count = 1;
  let twitterHandle = "";
  let followers = 0;
  let following = 0;

  let baseURL =
    "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=";
  let endURL = "exclude_replies=true&include_rts=false";
  let max_id = Infinity;
  let tweet = [];
  try {
    if (req.query.twitterHandle) {
      twitterHandle = req.query.twitterHandle;
      if (req.query.count) {
        count = req.query.count;
      }
      let url =
        baseURL + twitterHandle + "&count=" + count.toString() + "&" + endURL;
      request(
        url,
        {
          auth: {
            bearer: process.env.TWITTER_OAUTH_TOKEN,
          },
        },
        function (err, resp, body) {
          if (resp.statusCode === 200) {
            let tweets = JSON.parse(resp.body);
            if (tweets.length !== 0) {
              // set params from first tweet and get last tweet ID
              twitterHandle = tweets[0].user.screen_name;
              followers = tweets[0].user.followers_count;
              following = tweets[0].user.friends_count;
              max_id = tweets[0].id_str;

              request(
                url + "&max_id=" + max_id,
                {
                  auth: {
                    bearer: process.env.TWITTER_OAUTH_TOKEN,
                  },
                },
                function (err, resp1, body) {
                  if (resp1.statusCode === 200) {
                    let tweets1 = JSON.parse(resp1.body);
                    if (tweets1.length !== 0) {
                      tweets1.forEach((element) => {
                        let z = element.text.split("\n");
                        tweet.push(z);
                      });
                      let canvas_shape = 0;
                      tweet.forEach((el) => {
                        canvas_shape = canvas_shape + el.length;
                      });
                      // Add linebreak after each tweet and heading to the total length of canvas
                      canvas_shape = (canvas_shape + tweet.length + 1) * 100;
                      const canvas = createCanvas(1300, canvas_shape);
                      var ctx = canvas.getContext("2d");
                      ctx.font = "15px Verdana";

                      var gradient1 = ctx.createLinearGradient(
                        0,
                        0,
                        canvas.width,
                        0
                      );
                      gradient1.addColorStop(0, "blue");
                      gradient1.addColorStop(0.5, "magenta");
                      ctx.fillStyle = gradient1;
                      let heading =
                        "Twitter Handle:" +
                        twitterHandle +
                        "     Followers:" +
                        followers.toString() +
                        "    Following:" +
                        following.toString();
                      ctx.fillText(heading, 0, 50);
                      ctx.strokeStyle = "rgba(0,0,0,0.5)";
                      ctx.beginPath();
                      ctx.lineTo(0, 55);
                      ctx.lineTo(ctx.measureText(heading).width, 55);
                      ctx.stroke();
                      ctx.fillText("", 0, 70);
                      // Create gradient
                      var gradient = ctx.createLinearGradient(
                        0,
                        57,
                        canvas.width,
                        57
                      );
                      gradient.addColorStop(0, "magenta");
                      gradient.addColorStop(0.5, "blue");
                      gradient.addColorStop(1.0, "red");
                      // Fill with gradient
                      ctx.fillStyle = gradient;
                      let line_number = 2;
                      for (var i = 0; i < tweet.length; i++) {
                        for (var j = 0; j < tweet[i].length; j++) {
                          ctx.fillText(tweet[i][j], 0, 50 + line_number * 20);
                          line_number = line_number + 1;
                        }
                        // Draw line under each tweet
                        var text = ctx.measureText(tweet[i][j - 1]);
                        ctx.beginPath();
                        ctx.lineTo(0, 55 + (line_number - 1) * 20);
                        ctx.lineTo(text.width, 55 + (line_number - 1) * 20);
                        ctx.stroke();
                        ctx.fillText("", 0, 50 + line_number * 20);
                        // Add line break line number
                        line_number = line_number + 1;
                      }
                      var img = canvas.toBuffer();
                      res.writeHead(200, {
                        "Content-Type": "image/png",
                        "Content-Length": img.length,
                      });
                      res.end(canvas.toBuffer());
                    } else {
                      var img = canvas1.toBuffer();
                      res.writeHead(200, {
                        "Content-Type": "image/png",
                        "Content-Length": img.length,
                      });
                      return res.end(canvas1.toBuffer());
                    }
                  } else {
                    var img = canvas1.toBuffer();
                    res.writeHead(200, {
                      "Content-Type": "image/png",
                      "Content-Length": img.length,
                    });
                    return res.end(canvas1.toBuffer());
                  }
                }
              );
            } else {
              var img = canvas1.toBuffer();
              res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": img.length,
              });
              return res.end(canvas1.toBuffer());
            }
          } else {
            var img = canvas1.toBuffer();
            res.writeHead(200, {
              "Content-Type": "image/png",
              "Content-Length": img.length,
            });
            return res.end(canvas1.toBuffer());
          }
        }
      );
    } else {
      var img = canvas1.toBuffer();
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
      });
      return res.end(canvas1.toBuffer());
    }
  } catch (err) {
    console.log(err);
    var img = canvas1.toBuffer();
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": img.length,
    });
    return res.end(canvas1.toBuffer());
  }
});

app.get("/tweet", async function (req, res) {
  var fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl; // gets full request url and checks if a cache exists on Redis
  const cacheResults = await redisClient.get(fullUrl);
  if (false) {
    var cache_data = JSON.parse(cacheResults);
    var img = Buffer.from(cache_data.data); // if a cache exists we create an image buffer and send to the requester
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": img.length,
    });
    res.end(img); // cached tweet image return
  } else {
    // generates tweet image and then caches it
    let count = 1;
    let twitterHandle = "";

    let baseURL =
      "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=";
    let endURL = "exclude_replies=true&include_rts=false";
    let max_id = Infinity;
    let oembedBase =
      "https://publish.twitter.com/oembed?url=https://twitter.com/";
    let theme = "dark";
    let maxwidth = "550";
    let lang = "en";
    let height = 2000;
    let id = "";
    try {
      req.query.id ? (id = req.query.id) : (id = "");
      req.query.theme ? (theme = req.query.theme) : (theme = "dark");
      req.query.maxwidth ? (maxwidth = req.query.maxwidth) : (maxwidth = "550");
      req.query.lang ? (lang = req.query.lang) : (lang = "en");
      req.query.height ? (height = req.query.height) : (height = 2000);
      if (req.query.twitterHandle) {
        twitterHandle = req.query.twitterHandle;
        if (req.query.count) {
          count = req.query.count;
        }
        let url =
          baseURL + twitterHandle + "&count=" + count.toString() + "&" + endURL;
        console.log(url)
        request(
          url,
          {
            auth: {
              bearer: process.env.TWITTER_OAUTH_TOKEN,
            },
          },
          function (err, resp, body) {
            console.log({ resp })
            console.log(process.env.TWITTER_OAUTH_TOKEN)
            if (resp.statusCode === 200) {
              let tweets = JSON.parse(resp.body);
              if (tweets.length !== 0) {
                // set params from first tweet, and get last tweet ID
                twitterHandle = tweets[0].user.screen_name;

                id ? (max_id = id) : (max_id = tweets[0].id_str);
                let oembedUrl =
                  oembedBase +
                  twitterHandle +
                  "/status/" +
                  max_id +
                  "&theme=" +
                  theme +
                  "&align=center&lang=" +
                  lang +
                  "&maxwidth=" +
                  maxwidth;
                request(oembedUrl, async function (err, resp2, body) {
                  const data = JSON.parse(resp2.body);
                  let page = "";
                  try {
                    if (browser) {
                      page = await browser.newPage();
                    } else {
                      browser = await puppeteer.launch({
                        args: ["--no-sandbox"],
                      });
                      page = await browser.newPage();
                    }
                    await page.setViewport({
                      width: parseInt(maxwidth),
                      height: parseInt(height),
                    });
                    await page.setContent(data.html, {
                      waitUntil: "networkidle0",
                    });
                    let ele = await page.$(".twitter-tweet");
                    const boundingBox = await ele.boundingBox();

                    var img = await ele.screenshot({
                      type: "png",
                      clip: {
                        x: boundingBox.x,
                        y: boundingBox.y,
                        width: Math.min(
                          page.viewport().width,
                          boundingBox.width
                        ),
                        height: Math.min(
                          boundingBox.height,
                          page.viewport().height
                        ),
                      },
                    });
                    await page.close();
                    res.writeHead(200, {
                      "Content-Type": "image/png",
                      "Content-Length": img.length,
                    });
                    await redisClient.set(fullUrl, JSON.stringify(img), {
                      EX: 86400,
                      NX: true,
                    }); // image buffer is cached on the redis client which expires in 24 hours
                    res.end(img);
                  } catch (err) {
                    console.log(err);
                    var img = canvas1.toBuffer();
                    res.writeHead(200, {
                      "Content-Type": "image/png",
                      "Content-Length": img.length,
                    });
                    return res.end(canvas1.toBuffer());
                  }
                });
              } else {
                var img = canvas1.toBuffer();
                res.writeHead(200, {
                  "Content-Type": "image/png",
                  "Content-Length": img.length,
                });
                return res.end(canvas1.toBuffer());
              }
            } else {
              var img = canvas1.toBuffer();
              res.writeHead(200, {
                "Content-Type": "image/png",
                "Content-Length": img.length,
              });
              return res.end(canvas1.toBuffer());
            }
          }
        );
      } else {
        var img = canvas1.toBuffer();
        res.writeHead(200, {
          "Content-Type": "image/png",
          "Content-Length": img.length,
        });
        return res.end(canvas1.toBuffer());
      }
    } catch (err) {
      console.log(err);
      var img = canvas1.toBuffer();
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": img.length,
      });
      return res.end(canvas1.toBuffer());
    }
  }
});

const port = process.env.PORT || 8081;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
