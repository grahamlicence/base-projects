var express = require('express'),
    path    = require('path'),
    app = express(),
    host = express();


// mock iframe site
app.get('/scuk_calc.css', function (req, res) {
  res.sendFile(path.join(__dirname+'/dist/scuk_calc.css'));
});
app.get('/calculator.js', function (req, res) {
  res.sendFile(path.join(__dirname+'/dist/calculator.js'));
});

// mock api
app.get('/api', function (req, res) {
    var data    = require('./dist/data.json');
    res.jsonp(JSON.stringify(data));
});

// mock parent site
host.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/test/index.html'));
});

app.listen(8001, function () {
  console.log('Santander calculator listening on port 8001!');
});

host.listen(8002, function () {
  console.log('Test host listening on port 8002!');
});