import * as htmlToImage from 'html-to-image';

var node = document.createElement('html');
node.innerHTML('<div>Hello World</div>');


module.exports = (req, res) => {
    htmlToImage.toPng(node)
        .then(function (dataUrl) {
            // download(dataUrl, 'my-node.png');
            var img = new Image();
            img.src = dataUrl;
            // // document.body.appendChild(img);
            res.send(img);
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });    
    // const { name = 'World' } = req.query
    // res.send(`Hello ${name}!`)
}