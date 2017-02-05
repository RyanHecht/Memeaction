var express = require('express');
var path    = require("path");

var app = express();

app.get('/', function(req, res, next) {
  res.send("Nothing to see here...<i>yet!</i>");
});

app.get('/image', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/takePicture.html'));
});

app.post('/uploadImage', function(req, res, next) {
   console.log("got it");
   console.log(req.data);
});
app.get('/js/:file', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/js/captureImage.js'));
});

app.listen('8080', function() {
  console.log("Server running!")
});
