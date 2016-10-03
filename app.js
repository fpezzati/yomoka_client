var express = require('express');
var app = express();
console.log("__dirname = "+__dirname);
app.use(express.static(__dirname + '/public'));

app.get('/srv/offer/read/all', function(req, res){
  res.sendFile('./mock/offer.js', {root: __dirname});
});
app.listen(80, function(){});
