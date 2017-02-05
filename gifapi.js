URL = "https://www.qnt.io/api/results?pID=gifgif&mID=";
PUBLIC_KEY = "&key=54a309ac1c61be23aba0da3f";
MID_BASE = "54a309ae1c61be23aba0da5";
LIMIT = "&limit=";

attributeList = ['contempt', 'relief', 'pride', 'satisfaction', 'excitement', 'happy', 'guilt', 'anger',
                'pleasure', 'sadness', 'fear', 'amusement', 'embarrasment', 'contentment', 'shame'];
// missing: satisfaction, sadness,
microsoftAttributeList = ['anger', 'contempt', 'disgust', 'fear', 'happiness', 'neutral', 'sadness', 'surprise'];

sharedAttributes = ['anger', 'contempt', 'fear', 'happy', 'sadness']
// note that happy is happiness in the attributeList

var emotionDictionary = {'anger' : '4', 'contempt' : '5', 'fear' : 'a', 'happiness' : 'c',
'neutral' : '6'};
// sadness search giphy
// surprise search giphy
// disgust search giphy

var request = require('request');
var rp = require('request-promise');
var getGifs = function(emotion){
  var gifLinks = [];
  if(emotion in emotionDictionary){
    var options = {
      method: 'GET',
      uri: URL + MID_BASE+emotionDictionary[emotion]+LIMIT+"5"+PUBLIC_KEY,
      json: true
    };
    // should I return this?
    return rp(options)

    }
  else{
    var options = {
      method: 'GET',
      uri: "http://api.giphy.com/v1/gifs/search?q=" + emotion + "&limit=5&api_key=dc6zaTOxFJmzC",
      json: true
    };
    return rp(options)
    }
};
module.exports = getGifs;
//getGifs('anger');
//console.log(getGifs('sadness'));

// the param we want is emdedURL (I think)
/*
// 3 = http://media.giphy.com/media/10tuoRc0MNYn1S/giphy.gif
amusement = 3;
// 4 = http://media.giphy.com/media/rGnsYIj02OBS8/giphy.gif
anger = 4;
// 5 = http://media2.giphy.com/media/hsQiaCx9JyyeQ/giphy.gif
contempt = 5;
// 6 = http://media.giphy.com/media/rwqtumawean2o/giphy.gif
contentment = 6;
// 7 = http://media.giphy.com/media/jvtGmtA1KiUcnu/giphy.gif
disgust = 7;
// 8 = http://media.giphy.com/media/29BzAuDhcTzfG/giphy.gif
embarrasment = 8;
// 9 = http://media.giphy.com/media/Mn0C1r0qL7XWg/giphy.gif
excitement = 9;
// a = http://media.giphy.com/media/13A9oAAyovT2Cc/giphy.gif
fear = a;
// b = http://media.giphy.com/media/29BzAuDhcTzfG/giphy.gif
guilt = b;
// c = http://media.giphy.com/media/MazO89pt5NljG/giphy.gif
happiness = c;
// d = http://media2.giphy.com/media/12xiOA46vEYGl2/giphy.gif
pleasure = d;
// e = http://media.giphy.com/media/isY0HE006jGDu/giphy.gif
pride = e;
// f = http://media.giphy.com/media/tMPSeKEplOfK0/giphy.gif
relief = f;
*/
