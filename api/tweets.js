const request = require('request');
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d');


// Write "Awesome!"
ctx.font = '30px Impact'
ctx.fillText('Awesome!', 50, 100)


module.exports = (req, res) => {    
    // request({ url, encoding: null }, (err, resp, buffer) => {
        res.send(canvas.toBuffer())
    // });
    
}
