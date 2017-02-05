var express = require('express');
var path    = require("path");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
var port = process.env.port || 8080
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/image', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/takePicture.html'));
});

app.get('/about', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/about.html'));
});

app.post('/results', function(req, res, next) {
  console.log(req.body);
  res.render('index', req.body)
})

app.post('/uploadImage', function(req, res, next) {
   var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
   var rand = Math.floor(Math.random() * 1000000);
    require("fs").writeFile("img/" + rand + ".png", base64Data, 'base64', function(err) {
      if(err) console.log(err)
      else {
        resData = {}
        gifLinks = []
        require("./getEmotion")(rand)
        .then(function (body) {
          var emotion = emotionFromResponse(body);
          require("./gifapi")(emotion)
          .then(function(data){
            for (count = 0; count < 4; count ++){
              var value="";
              var index = Math.floor(Math.random() * 20);
              if('content_data' in data.results[index]) {
                value = data.results[index].content_data.embedLink;
              }
              else {
                value = data.data[index].images.original.url;
              }
              value = value.split("/")[4]
              gifLinks.push(value);
              //console.log('added value:' + value);
          }

          resData.gifs = gifLinks
          resData.emotion = emotion
          resData.imgID = rand
          res.send(resData)
        }
          )
          .catch(function(err){
            console.log(err);
          });

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
