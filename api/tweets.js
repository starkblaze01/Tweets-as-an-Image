var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function (req, res) {
    // fs.readFile('one.png', function (err, data) {
    //     if (err) throw err;
    //     res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    //     res.end(data)
    // })
    res.send('Hello World');

})

// var server = app.listen(8081, function () {
//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)
// })