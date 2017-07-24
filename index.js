var express = require('express'),
	app = express(),
	versionRoute = require('./app/routes/v1/versionRoute');
	body = require("body-parser"),
	port = 8008;

app.use(body.urlencoded({extended:true}));
app.use(body.json());
app.use(express.static('node_modules'));
app.use(express.static('views'));
app.set('view engine','ejs');

app.listen(port, function(){
	console.log("Server Running in "+ port);
});

app.use(function(req, res, next) { 
	res.header("Access-Control-Allow-Origin", "http://*, https://*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, content-type, Origin, X-Requested-With, Content-Type, Accept");
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	}
	else {
		next();
	}
});

app.get('/', function(req, resp, next){
	resp.render('index');
});

app.use('/v1', versionRoute);