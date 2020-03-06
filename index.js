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

app.post('/api/homework', jsonParser, function (req, res) {
    var hw = {};
    try {
        hw = getHomework();
    }
    catch{ }
    rq = req.body;

    if (rq.c != null)
        hw.c = rq.c;
    if (rq.m != null)
        hw.m = rq.m;
    if (rq.e != null)
        hw.e = rq.e;
    if (rq.p != null)
        hw.p = rq.p;
    if (rq.b != null)
        hw.b = rq.b;

    saveHomework(hw);

    res.send({ "code": 200 });
})

var server = app.listen(8308, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址为 http://%s:%s", host, port)
})

function getHomework() {
    var j = fs.readFileSync(cfg);
    return JSON.parse(j);
}
function saveHomework(hw) {
    fs.writeFile(cfg, JSON.stringify(hw), () => { });
}