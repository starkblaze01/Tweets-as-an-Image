var express = require('express');
var image = new Image();
image.src = 'https://cnet2.cbsistatic.com/img/bZaqv6tPvT44-cop4ZL2gG3j5wE=/940x0/2020/01/17/7da55a03-ac5b-4ec1-b59b-6b3c2414e68b/egdt5idw4aittju.jpg'
module.exports = (req, res) => {    
    res.send(image)
}
