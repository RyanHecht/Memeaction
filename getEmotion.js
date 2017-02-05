var request = require('request');
module.exports =
function(imgID) {

  var object = { "url": "http://memeaction.azurewebsites.net/img/" + imgID + ".png" }

  console.log(object);
  request({
    url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
    method: 'POST',
    headers: {
      'Content-Type':     'application/json',
      'Ocp-Apim-Subscription-Key': '9fa170b54cd845d787ca0bee2dfd9daf'
    },
    json: object
}, function(error, response, body){
    if(error) {
        console.log("error: " + error);
    } else {
        return "got it: " + body;
    }
});

};
