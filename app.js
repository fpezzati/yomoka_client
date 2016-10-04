var express = require('express');
var app = express();
console.log("__dirname = "+__dirname);
app.use(express.static(__dirname + '/public'));

app.get('/srv/offer/read/all', function(req, res){
  res.sendFile('./mock/offerset.js', {root: __dirname});
});
app.get('/srv/offer/read/:id', function(req, res) {
  res.sendFile('./mock/offersingle.js', {root: __dirname});
});
app.listen(80, function(){});
