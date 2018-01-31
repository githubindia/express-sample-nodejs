var express = require('express');
var processor = require('./processor/module.js');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

var port = process.env.PORT||3000;


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
})//Sends HTML

app.get("/api/process", function(req, res) {
    var result = processor.loopback("Amit");
    res.send(result);
})//Sample for Sending and Receiveing Data


app.post("/api", function(req, res) {
    console.log("Incoming Request Payload" + JSON.stringify(req.body));
    var answer = processor.concat(req);
    
    res.send(answer);
})//POST sample

// Getting a response from zomato api.
app.get("/getApi", function(req, res){
    var result = processor.loopback1();
    res.send(result);
})

app.listen(port);
console.log("Server Running Successfully at port " + port);