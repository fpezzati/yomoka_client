var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/srv/offer/all', function(req, res){
  console.log("get offer set.");
  var dataset = new Array();
  for (var key in database) {
    dataset.push(database[key]);
  }
  res.send(dataset);
});
app.get('/srv/offer/:id', function(req, res) {
  console.log("read offer: "+req.params.id);
  if(req.params.id in database) {
    res.send(database[req.params.id]);
  } else {
    res.send('{"description": "NONE"}');
  }
});
app.get('/srv/map/layer/:id', function(req, res) {
  console.log('read layer: ' + req.params.id + ' bound to path ' + './mock/layer' + req.params.id + '.js');
  res.sendFile('./mock/layer' + req.params.id + '.js', {root: __dirname});
});
app.post('/srv/offer', function(req, res) {
  console.log("creating offer: "+JSON.stringify(req.body));
  var newOffer = req.body;
  newOffer._id = new Date().getMilliseconds();
  if(!(newOffer._id in database)) {
    database[newOffer._id] = newOffer;
    res.send(JSON.stringify(newOffer));
  } else {
    res.send('{"description": "OFFER EXISTS"}');
  }
});
app.put('/srv/offer', function(req, res) {
  console.log("update offer: "+JSON.stringify(req.body));
  if(req.body._id in database) {
      database[req.body._id] = req.body;
      res.send(JSON.stringify(req.body));
  } else {
    res.send('{"description": "NONE"}');
  }
});
app.delete('/srv/offer/:id', function(req, res) {
  console.log("delete offer.id: "+req.params.id);
  if(req.params.id in database) {
      delete database[req.params.id];
  } else {
    res.send('{"description": "NONE"}');
  }
});
app.listen(80, function(){});

var initDb = function(database) {
    database["57e2eae8860278f2d1a03ff7"] = { "_id" : "57e2eae8860278f2d1a03ff7", "expires" : "2016-09-12T08:00:00Z", "crs" : 0, "owner_id" : "57e2eae8860278f2d1a03ff6", "latitude" : 43.770166, "description" : "tasty tomatoes", "longitude" : 11.208077 };
    database["57e2eb59860296dfe44ee9eb"] = { "_id" : "57e2eb59860296dfe44ee9eb", "expires" : "2016-09-12T08:00:00Z", "crs" : 0, "owner_id" : "57e2eb59860296dfe44ee9ea", "latitude" : 44.770166, "description" : "delicious peaches", "longitude" : 10.208077 };
};
var database = {};
initDb(database);
