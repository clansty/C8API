var express = require('express');
var app = new express();
var fs = require("fs");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const cfg = "data.json";

app.get('/api/homework', function (req, res) {
    res.end(fs.readFileSync(cfg, 'utf-8'));
});

app.get('/api/homework/:subject', function (req, res) {
    console.log(req);
    res.end("233");
})

app.post('/api/save', jsonParser, function (req, res) {
    console.timeLog("233", req);
    console.log(req.body)
    res.send({ "status": "ok" });
})

var server = app.listen(8308, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址为 http://%s:%s", host, port)
})