// import domtoimage from 'dom-to-image';
// var node = document.createElement('html');
// node.innerHTML('<div>Hello World</div>');


module.exports = (req, res) => {
    const fs = require('fs');
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
    const contents = fs.readFileSync('one.png', { encoding: 'base64' });
        // res.send('Hello World');
    res.send(contents)
}