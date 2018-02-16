var express = require('express');
var app = express();
var router = express.Router();
var morgan = require('morgan');
var db = require('./db/mysql.js');
var path = require('path');
var processor = require('./src/module.js');
var geoip = require('geoip-lite');

router.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../index.html'));
});

router.route('/api/v1/users')

  .get(function(req, res) {
    console.log("local IP ", ip(req));
    var response = db.getUserRecords(req.query, function(response) {
        res.status(response.status_code).send(response); 
    });
  })

  .post(function(req, res) {
    console.log("local IP ", ip(req));
    var response = db.insertRecord(req.body, function(response) {
        res.status(response.status_code).send(response);  
    });
  })

  .put(function(req, res) {
    console.log("local IP ", ip(req));
     var response = db.updateRecord(req.body, function(response) {
        res.status(response.status_code).send(response);
     });
  })

  .delete(function(req, res) {
    console.log("local IP ", ip(req));
    var response = db.deleteRecord(req.body, function(response) {
        res.status(response.status_code).send(response);
    });
  });

router.all('*', function(req, res) {
    console.log("local IP ", ip(req));
    var message = "Invalid url.";
    res.status(404).send(processor.getPageError(message));
});//handle invalid url.

var ip = function (req) {
    return  (req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress).split(",")[1];
    }

module.exports = router;