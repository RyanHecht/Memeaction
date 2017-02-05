var express = require('express');
var path    = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
var port = process.env.port || 8080
app.get('/', function(req, res, next) {
  res.send("Nothing to see here...<i>yet!</i>");
});

app.get('/image', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/takePicture.html'));
});

app.post('/uploadImage', function(req, res, next) {
   var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
   var rand = Math.floor(Math.random() * 1000000);
    require("fs").writeFile("img/" + rand + ".png", base64Data, 'base64', function(err) {
      console.log(err);
    });
    var emotion = require("./getEmotion")(rand);
    console.log("emotion: " + emotion)
    res.send(emotion);
});

app.get('/js/:file', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/js/captureImage.js'));
});

app.get('/img/:file', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/img/' + req.params.file))
})

app.listen(port, function() {
  console.log("Server running!")
});
