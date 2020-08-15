const request = require('request');
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)

// Write "Awesome!"
var ctx = canvas.getContext("2d");
ctx.font = "30px Arial";
ctx.fillText("Hello World", 10, 50);

module.exports = (req, res) => {    
    // request({ url, encoding: null }, (err, resp, buffer) => {
    res.send(canvas.toBuffer())
    // });
    
}
