var express = require('express');
var path    = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({limit: '50mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res, next) {
  res.send("Nothing to see here...<i>yet!</i>");
});

app.get('/image', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/takePicture.html'));
});

app.post('/uploadImage', function(req, res, next) {
   var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
    require("fs").writeFile("img/out.png", base64Data, 'base64', function(err) {
      console.log(err);
    });
});

app.get('/js/:file', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/js/captureImage.js'));
});

app.listen('8080', function() {
  console.log("Server running!")
});
