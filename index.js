var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
  res.send("Hello World!");
})


app.listen('8080', function() {
  console.log("Server running!")
})
