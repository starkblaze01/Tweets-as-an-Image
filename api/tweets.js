import domtoimage from 'dom-to-image';
var fs = require('fs');

var node = document.createElement('html');
node.innerHTML('<div>Hello World</div>');


module.exports = (req, res) => {
    // domtoimage.toPng(node)
    //     .then(function (dataUrl) {
    //         download(dataUrl, 'my-node.png');
    //         var img = new Image();
    //         img.src = dataUrl;
    //         document.body.appendChild(img);
    //         res.send(node);
    //     })
    //     .catch(function (error) {
    //         console.error('oops, something went wrong!', error);
    //     });    
    // const { name = 'World' } = req.query
    fs.readFile('one.png', function (err, data) {
        if (err) throw err;
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        // res.send('Hello World');
        res.send(data)
    })
}