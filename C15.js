// Add support for real-time homework change
// part of C15
const fs = require('fs');
const cp = require('child_process');
cp.exec('cd C:\\C15 && wscript.exe hwconv.vbs');
fs.watchFile('C:/Users/baban/Desktop/hw.docx', {interval: 1000}, function(curr, prev){
	// data changed
	console.log('File changed.');
	cp.exec('cd C:\\C15 && wscript.exe hwconv.vbs');
});
fs.watchFile('C:/Users/baban/Desktop/hw.txt', {interval: 1000}, function(curr, prev){
	// data changed
	console.log('File changed.');
	cp.exec('cd C:\\C15 && wscript.exe hwconv2.vbs');
});
console.log('Watch added.');

tb = 0;
tbcon = [];

function arrloop(arr, cur, off){
	if(off == 0) return cur;
	var n = arr.length;
	// current is simulator, optimise it later
	/* var m = off>0?-1:1;
	while(off != 0){
		off += m;
		cur += -m;
		if(cur < 0) cur = n-1;
		if(cur >= n) cur = 0;
	}
	return cur;*/
	if(off > 0) return (cur+off)%n;
	else return (cur+off+n*((-off)%n+1))%n;
}

function tbSync(){
	var d = new Date();
	var curd = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();
	var pfile = "data/curr.int";
	var pF = '0,'+curd;
	try{
		tb = parseInt((pF=fs.readFileSync(pfile).toString('binary').split(','))[0]);
	}catch(e){}
	try{
		tbcon = JSON.parse(fs.readFileSync('data/tb.jconf'));
	}catch(e){
		throw 'Internal error from Tb\n'+e;
	}
	// var pdate = Date.parse(pF[1]);
	// var minus = d - pdate;
	// var lop = (minus / (60 * 60 * 24 * 1000))|0;
	var lop = curd == pF[1] ? 0 : 1;
	var N = tbcon.length;
	if(lop == 0) return [tb, N];
	var curr = arrloop(tbcon, tb, lop);
	fs.writeFileSync(pfile, ''+curr+','+curd);
	return [curr, N];
}

function init(app){
	tbSync();	// to make sure if this could work
	app.get('/api/tb', function(req, res){
		var t;
		var ret = (t=tbSync())[0];
		ret = ret || 0;
		res.send({R: ret, S: tbcon[ret], pS: tbcon[ret==0?t[1]-1:ret-1]});
	});
	app.get('/api/schedule', function(req, res){
		try{
			res.send({SCH: fs.readFileSync('data/schedule.jconf').toString('utf-8').split('\n')[new Date().getDay()-1].split(',')});
		}catch(e){}
	});
}

module.exports = {
	init
}
