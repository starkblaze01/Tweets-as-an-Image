const request = require('request');
const Jimp = require('jimp')
let image = new Jimp(256, 256)

image.quality(60)
Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
    image.print(font, 10, 10, 'Hello \n world!');
});

module.exports = (req, res) => {    
    // request({ url, encoding: null }, (err, resp, buffer) => {
    image.getBuffer(Jimp.MIME_PNG, function (err, src) {
        res.send(src)
    })
    // });
    
}
