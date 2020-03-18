var express = require('express');
var app = new express();
var fs = require("fs");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const cors = require('cors');
const Memobird = require('memobird');

app.use(cors());

app.get('/', function (req, res) {
    res.send("欢迎来到高三八班 API");
});

app.get('/api/homework', function (req, res) {
    res.send(getHomework());
});

app.get('/api/slogan', function (req, res) {
    res.send(fs.readFileSync('data/slogan.json'));
});

app.post('/api/slogan', jsonParser, function (req, res) {
    fs.writeFile('data/slogan.json', JSON.stringify(req.body), () => { });
    res.send({ code: 200 });
});

app.get('/api/homework/:subject', function (req, res) {
    var hw = getHomework();
    if (hw[req.params.subject] == null) {
        res.status(404).json({ code: 404 });
        return;
    }
    res.send(hw[req.params.subject]);
})

app.post('/api/homework', jsonParser, function (req, res) {
    var hw = {};
    try {
        hw = getHomework();
    }
    catch{ }
    rq = req.body;

    if (rq.c != null) //语文
        hw.c = rq.c;
    if (rq.m != null) //数学
        hw.m = rq.m;
    if (rq.e != null) //英语
        hw.e = rq.e;
    if (rq.p != null) //物理
        hw.p = rq.p;
    if (rq.b != null) //生物
        hw.b = rq.b;
    if (rq.z != null) //班务
        hw.z = rq.z;

    if (rq.size != null) //字体大小
        hw.size = rq.size;

    saveHomework(hw);

    res.send({ code: 200 });
})

app.post('/api/memobird/printHtml', jsonParser, function (req, res) {
    const memobird = new Memobird({
        ak: 'c7548afbab99479e9f9a59aa1d65d5c6',
        memobirdID: 'b9d6fe6526d3e0ec',
        useridentifying: 'lw',
    });
    memobird.printHtml(req.body.content)
        .then(printcontentid => memobird.watch(printcontentid, 3000, 15000))
        .then(printflag => res.send({ status: printflag == 1 }));

})

app.post('/api/memobird/printText', jsonParser, function (req, res) {
    const memobird = new Memobird({
        ak: 'c7548afbab99479e9f9a59aa1d65d5c6',
        memobirdID: 'b9d6fe6526d3e0ec',
        useridentifying: 'lw',
    });
    memobird.printText(req.body.content)
        .then(printcontentid => memobird.watch(printcontentid, 3000, 15000))
        .then(printflag => res.send({ status: printflag == 1 }));
})

var server = app.listen(8308, '0.0.0.0', function () {
    var host = server.address().address
    var port = server.address().port
    console.log("访问地址为 http://%s:%s", host, port)
})

function getHomework() {
    var d = new Date();
    try {
        var j = fs.readFileSync("data/" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + ".json");
        return JSON.parse(j);
    }
    catch{
        var o = {
            c: "",
            m: "",
            e: "",
            p: "",
            b: "",
            z: "",
            size: 30
        };
        fs.writeFileSync("data/" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + ".json", JSON.stringify(o));
        return getHomework();
    }
}
function saveHomework(hw) {
    var d = new Date();
    fs.writeFile("data/" + d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + ".json", JSON.stringify(hw), () => { });
}