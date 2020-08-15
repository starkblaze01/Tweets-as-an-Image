const request = require('request');
const { createCanvas, loadImage, registerFont } = require('canvas')
registerFont('comicsans.ttf', { family: 'Comic Sans' })

const canvas = createCanvas(500, 500)


// Write "Awesome!"
var ctx = canvas.getContext("2d");
ctx.font = '12px "Comic Sans"'
ctx.fillText('Everyone hates this font :(', 250, 10)

module.exports = (req, res) => {    
    // request({ url, encoding: null }, (err, resp, buffer) => {
    res.send(canvas.toBuffer())
    // });
    
}
