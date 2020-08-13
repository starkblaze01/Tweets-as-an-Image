import * as htmlToImage from 'html-to-image';
import { toPng } from 'html-to-image';

var node = <div>Hello World</div>


module.exports = (req, res) => {
    htmlToImage.toPng(node)
        .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            // document.body.appendChild(img);
            res.send(img);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    // const { name = 'World' } = req.query
    // res.send(`Hello ${name}!`)
}