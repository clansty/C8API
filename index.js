var express = require('express');
var app = new express();
var fs = require("fs");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const cors = require('cors');
const Memobird = require('memobird');

app.use(cors());
global.slogan = fs.readFileSync('data/slogan.json');
try {
    var j = fs.readFileSync('data/hitokoto.json');
    global.hitokoto = JSON.parse(j);
}
catch{
    global.hitokoto = [];
}

app.get('/', function (req, res) {
    res.send("欢迎来到高三八班 API");
});

app.get('/api/homework', function (req, res) {
    res.send(getHomework());
});

app.get('/api/homeworks', function (req, res) {
    var hw = getHomework();
    rt = "";
    if (hw.c) {
        rt += "语文：";
        var tmp = hw.c;
        tmp = tmp.replace('\r', '');
        tmp = tmp.split('\n');
        tmp.forEach(i => {
            rt += '\n  ' + i;
        });
    }
    if (hw.m) {
        rt += "\n数学：";
        var tmp = hw.m;
        tmp = tmp.replace('\r', '');
        tmp = tmp.split('\n');
        tmp.forEach(i => {
            rt += '\n  ' + i;
        });
    }
    if (hw.e) {
        rt += "\n英语：";
        var tmp = hw.e;
        tmp = tmp.replace('\r', '');
        tmp = tmp.split('\n');
        tmp.forEach(i => {
            rt += '\n  ' + i;
        });
    }
    if (hw.p) {
        rt += "\n物理：";
        var tmp = hw.p;
        tmp = tmp.replace('\r', '');
        tmp = tmp.split('\n');
        tmp.forEach(i => {
            rt += '\n  ' + i;
        });
    }
    if (hw.b) {
        rt += "\n生物：";
        var tmp = hw.b;
        tmp = tmp.replace('\r', '');
        tmp = tmp.split('\n');
        tmp.forEach(i => {
            rt += '\n  ' + i;
        });
    }
    if (hw.z) {
        rt += "\n班务：";
        var tmp = hw.z;
        tmp = tmp.replace('\r', '');
        tmp = tmp.split('\n');
        tmp.forEach(i => {
            rt += '\n  ' + i;
        });
    }
    rt = rt.trim('\n');
    res.send(rt);
});

app.get('/api/slogan', function (req, res) {
    res.send(slogan);
});

app.post('/api/slogan', jsonParser, function (req, res) {
    slogan = JSON.stringify(req.body);
    fs.writeFile('data/slogan.json', slogan, () => { });
    res.send({ code: 200 });
});

app.post('/api/hitokoto', jsonParser, function (req, res) {
    var ht = {
        text: req.body.text,
        author: req.body.author,
        contributor: req.body.contributor
    }
    hitokoto.push(ht);
    fs.writeFile('data/hitokoto.json', JSON.stringify(hitokoto), () => { });
    res.send({ code: 200 });
});

app.get('/api/hitokoto', function (req, res) {
    var l = hitokoto.length;
    var i = Math.floor(Math.random() * l);
    res.send(hitokoto[i]);
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

var server = app.listen(8308, function () {
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