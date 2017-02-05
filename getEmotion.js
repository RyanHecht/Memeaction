var request = require('request-promise');

function emotionFromResponse(res) {
  var scores = res[0].scores
  var arr = Object.keys( obj ).map(function ( key ) { return obj[key]; });
  var max = Math.max.apply(null, arr);
  console.log(max);
}



module.exports =
function(imgID) {
  var options = {
    method: 'POST',
    uri: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
    body: { "url": "http://memeaction.azurewebsites.net/img/" + imgID + ".png" },
    json: true,
    headers: {
      'Content-Type':     'application/json',
      'Ocp-Apim-Subscription-Key': '9fa170b54cd845d787ca0bee2dfd9daf'
    }
  };
  request(options)
    .then(function (body) {
      console.log(body);
      var emotion = emotionFromResponse(body);
    })
    .catch(function (err) {
      console.log('err');
    })
};
