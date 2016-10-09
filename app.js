var express = require('express');
var app = express();
var database = {};
console.log("__dirname = "+__dirname);
app.use(express.static(__dirname + '/public'));

app.get('/srv/offer/read/all', function(req, res){
  console.log("get offer set.");
  res.sendFile('./mock/offerset.js', {root: __dirname});
});
app.get('/srv/offer/:id', function(req, res) {
  console.log("read offer: "+req.params.id);
  if(req.params.id in database) {
    res.send(database[req.params.id]);
  } else {
    res.send('{"description": "NONE"}');
  }
});
app.put('/srv/offer', function(req, res) {
  console.log("create offer: "+req.body);
  var newOffer = req.body;
  newOffer._id = new Date().getMilliseconds();
  if(!(newOffer._id in database)) {
    database[newOffer._id] = newOffer;
  } else {
    res.sent('{"description": "OFFER EXISTS"}');
  }
});
app.post('/srv/offer', function(req, res) {
  console.log("update offer: "+req.body);
  if(req.body._id in database) {
      database[req.body._id] = req.body;
  } else {
    res.sent('{"description": "NONE"}');
  }
});
app.delete('/srv/offer/:id', function(req, res) {
  console.log("delete offer.id: "+req.params.id);
  if(req.body._id in database) {
      delete database[req.body._id];
  } else {
    res.sent('{"description": "NONE"}');
  }
});
app.listen(80, function(){});

var initDb = function() {
    database["57e2eae8860278f2d1a03ff7"] = { "_id" : "57e2eae8860278f2d1a03ff7", "expires" : "2016-09-12T08:00:00Z", "crs" : 0, "owner_id" : "57e2eae8860278f2d1a03ff6", "latitude" : 43.770166, "description" : "tasty tomatoes", "longitude" : 11.208077 };
    database["57e2eb59860296dfe44ee9eb"] = { "_id" : "57e2eb59860296dfe44ee9eb", "expires" : "2016-09-12T08:00:00Z", "crs" : 0, "owner_id" : "57e2eb59860296dfe44ee9ea", "latitude" : 44.770166, "description" : "delicious peaches", "longitude" : 10.208077 };
};
