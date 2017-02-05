var express = require('express');
var path    = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
var port = process.env.port || 8080
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/image', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/takePicture.html'));
});

app.post('/uploadImage', function(req, res, next) {
   var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
   var rand = Math.floor(Math.random() * 1000000);
    require("fs").writeFile("img/" + rand + ".png", base64Data, 'base64', function(err) {
      if(err) console.log(err)
      else {
        require("./getEmotion")(rand)
        .then(function (body) {
          console.log(body);
          var emotion = emotionFromResponse(body);
          console.log(emotion);
        })
      }
      //res.status('500');
    });

    //console.log(JSON.stringify(emotion))
    //res.send(emotion);
});

app.get('/js/:file', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/js/' + req.params.file));
});

app.get('/style/:file*', function(req, res, next) {
  if(req.params.file == "materialize") {
    res.sendFile(path.join(__dirname+'/style/materialize/css/materialize.min.css'));
  }
  else {
    res.sendFile(path.join(__dirname+'/style/' + req.params.file));
  }

});

app.get('/img/:file*', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/img/' + req.params.file))
})

function emotionFromResponse(res) {
  var scores = res[0].scores
  var maxEmotion = "";
  var max = 0;
  for(key in scores) {
    if(scores[key] > max) {
      max = scores[key]
      maxEmotion = key
    }
  }
  return maxEmotion;
}

app.listen(port, function() {
  console.log("Server running!")
});
