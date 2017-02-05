var request = require('request');
var Blob = require('blob');
var atob = require('atob');
module.exports =
function(imgData) {
  var headers = {
    'Content-Type':     'application/octet-stream',
    'Ocp-Apim-Subscription-Key': '9fa170b54cd845d787ca0bee2dfd9daf'
  }
  var options = {
    url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
    method: 'POST',
    headers: headers,
    contentType: 'application/octet-stream',
    processData: false,
    body: imgData
  }
  request(options, function(error, response, body) {
    if(error) {
      console.log(error);
    }
    else {
      console.log(body);
    }
  })

};

dataURItoBlob = function(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});


}
