///////////////////////////////////////////////////////////////////////// CONFIGURE SERVER WITH DATABASE

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/csvQuery');

///////////////////////////////////////////////////////////////////////// DATA BASE MODELS


//////////////////////////////////////////////////////////////////////////  CONFIGURE ROUTES

app.use(express.static(__dirname + '/client'))
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

////////////////////////////////////////////////////////////////////////// RUN SERVER
process.on('uncaughtException', function (err) {
    console.log(err);
});

app.listen(8000, function () {
  console.log('listening on PORT 8000')
});

module.exports = app;