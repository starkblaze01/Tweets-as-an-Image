var express = require('express');
var app = express();
require('dotenv').config()
const request = require('request');
const { createCanvas } = require('canvas')


//error canvas
const canvas1 = createCanvas(500,500)
var ctx1 = canvas1.getContext('2d')
ctx1.font = '15px Verdana'
ctx1.fillText('Oops! Not Found', 50, 50)

app.get('/live', function(req, res){
    res.send('Hello World')
});

app.get('/', function (req, res) {
    let count = 1
    let twitterHandle = ''
    let followers = 0
    let following = 0

    let baseURL = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name='
    let endURL = 'exclude_replies=true&include_rts=false'
    let max_id = Infinity
    let tweet = []
    try{
    if (req.query.twitterHandle){
        twitterHandle = req.query.twitterHandle
        if(req.query.count){
            count = req.query.count
        }
        let url = baseURL+twitterHandle+'&count='+count.toString()+'&'+endURL
        request(url, {
            'auth': {
                'bearer': process.env.TWITTER_OAUTH_TOKEN
            }
            }, function (err, resp, body) {
                if (resp.statusCode === 200) {                    
                    let tweets = JSON.parse(resp.body)
                    if (tweets.length !== 0) {
                        // set params from first tweet and get last tweet ID
                        twitterHandle = tweets[0].user.screen_name
                        followers = tweets[0].user.followers_count
                        following = tweets[0].user.friends_count
                        max_id = tweets[0].id_str

                        request(url + '&max_id=' + max_id, {
                            'auth': {
                                'bearer': process.env.TWITTER_OAUTH_TOKEN
                                }   
                            }, function(err, resp1, body){
                                if(resp1.statusCode === 200){
                                    let tweets1 = JSON.parse(resp1.body)
                                    if (tweets1.length !== 0) {

                                        tweets1.forEach(element => {
                                            let z = element.text.split('\n')
                                            tweet.push(z)
                                        });
                                        let canvas_shape = 0
                                        tweet.forEach(el => {
                                            canvas_shape = canvas_shape + el.length
                                        })
                                        // Add linebreak after each tweet and heading to the total length of canvas
                                        canvas_shape = (canvas_shape+tweet.length+1) * 100
                                        const canvas = createCanvas(1300, canvas_shape)
                                        var ctx = canvas.getContext('2d')
                                        ctx.font = '15px Verdana'

                                        
                                        var gradient1 = ctx.createLinearGradient(0, 0, canvas.width, 0)
                                        gradient1.addColorStop(0, "blue")
                                        gradient1.addColorStop(0.5, "magenta");
                                        ctx.fillStyle = gradient1;
                                        let heading = 'Twitter Handle:' + twitterHandle + '     Followers:' + followers.toString() + '    Following:' + following.toString()
                                        ctx.fillText(heading, 0, 50)
                                        ctx.strokeStyle = 'rgba(0,0,0,0.5)'
                                        ctx.beginPath()
                                        ctx.lineTo(0, 55)
                                        ctx.lineTo(ctx.measureText(heading).width,55)
                                        ctx.stroke()
                                        ctx.fillText("",0, 70)
                                        // Create gradient
                                        var gradient = ctx.createLinearGradient(0, 57, canvas.width, 57);
                                        gradient.addColorStop(0, "magenta");
                                        gradient.addColorStop(0.5, "blue");
                                        gradient.addColorStop(1.0, "red");
                                        // Fill with gradient
                                        ctx.fillStyle = gradient;
                                        let line_number = 2
                                        for(var i =0;i<tweet.length; i++){
                                            for(var j=0;j<tweet[i].length;j++){
                                                ctx.fillText(tweet[i][j], 0, 50 + ( line_number * 20))
                                                line_number = line_number + 1
                                            }
                                            // Draw line under each tweet
                                            var text = ctx.measureText(tweet[i][j-1])
                                            ctx.beginPath()
                                            ctx.lineTo(0, 55 + ( (line_number-1) * 20))
                                            ctx.lineTo(text.width, 55 + ((line_number-1)* 20))
                                            ctx.stroke()
                                            ctx.fillText("", 0, 50 + (line_number*20))
                                            // Add line break line number
                                            line_number = line_number+1
                                        }

                                        res.send(canvas.toBuffer())
                                    } else{
                                        return res.send(canvas1.toBuffer())
                                    }
                                } else {
                                    return res.send(canvas1.toBuffer())
                                }
                            }) 
                    } else {
                        return res.send(canvas1.toBuffer())
                    }
                } else {
                    return res.send(canvas1.toBuffer())            
                }
        })
    } else{
        return res.send(canvas1.toBuffer())
    }
    }
    catch(err) {
        console.log(err)
        return res.send(canvas1.toBuffer())
    }
});
const port = process.env.PORT || 8081

var server = app.listen(port, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})