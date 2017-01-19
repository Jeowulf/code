var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./app/routes');
var port = process.env.PORT || 3000;

//determine routing path
app.use('/', router);
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//call to display favorites
app.get('/favorites', function(req, res) {
  var data = fs.readFileSync('./data.json');
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

//write to data.json by intercepting post method
app.post('/favorites', function(req, res) {
  var data = JSON.parse(fs.readFileSync('./data.json'));
  data.push(req.body);
  fs.writeFile('./data.json', JSON.stringify(data));
  res.setHeader('Content-Type', 'application/json');
  res.redirect('/');
});

app.listen(port, function() {
  console.log("Listening on port " + port);
});
