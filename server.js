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

app.get('/server.js', function(req, res, next) {
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
app.get('/count', function(req, res, next) {
    require("fs").readFile("counter.txt", "utf8", function(err, data) {
      res.send(data);
    })
})
/*app.get('/setupcounter', function(req, res, next) {
  var count = 136;
  require("fs").writeFile("counter.txt", count.toString(), "utf8", function(err2) {
    if(err2) console.log(err2);
    res.send("done")
  })
}) */

app.post('/uploadImage', function(req, res, next) {
   var base64Data = req.body.img.replace(/^data:image\/png;base64,/, "");
   var rand = Math.floor(Math.random() * 1000000);
    require("fs").readFile("counter.txt", "utf8", function(err, data) {
      if(err) console.log(err)
      else {
        var count = parseInt(data) + 1;
        console.log("count: " + count)
        require("fs").writeFile("counter.txt", count.toString(), "utf8", function(err2) {
          if(err2) console.log(err2);
        })
      }
    })
    require("fs").writeFile("img/" + rand + ".png", base64Data, 'base64', function(err) {
      if(err) console.log(err)
      else {
        resData = {}
        gifLinks = []
        require("./getEmotion")(rand)
        .then(function (body) {
          //console.log(body[0].scores);
          var emotion = emotionFromResponse(body);
          //console.log(emotion)
          require("./gifapi")(emotion)
          .then(function(data){
            usedNums = []
            for (count = 0; count < 4; count ++){
              var value="";
              var index;
              do {
                index = Math.floor(Math.random() * 20);
              }
              while(usedNums.includes(index));
              usedNums.push(index);
              if('results' in data) {
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

app.get('/teampictures/:file', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/teampictures/' + req.params.file));
});

app.get('/style/:file', function(req, res, next) {
  if(req.params.file == "materialize") {
    res.sendFile(path.join(__dirname+'/style/materialize/css/materialize.min.css'));
  }
  else {
    res.sendFile(path.join(__dirname+'/style/' + req.params.file));
  }

});

app.get('/img/:file', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/img/' + req.params.file))
});

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
  console.log("Server running on port " + port)
});
