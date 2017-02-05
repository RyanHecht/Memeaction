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
   var data = req.body.img;
   console.log(require('./getEmotion.js')(data));
});

app.get('/js/:file', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/js/captureImage.js'));
});

app.listen('8080', function() {
  console.log("Server running!")
});
