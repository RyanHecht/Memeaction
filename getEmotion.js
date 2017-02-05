var request = require('request-promise');

module.exports =
function(imgID) {
  //console.log()
  var options = {
    method: 'POST',
    uri: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
    body: { "url": "https://memeaction.azurewebsites.net/img/" + imgID + ".png" },
    json: true,
    headers: {
      'Content-Type':     'application/json',
      'Ocp-Apim-Subscription-Key': '9fa170b54cd845d787ca0bee2dfd9daf'
    }
  };
  return request(options)
};
