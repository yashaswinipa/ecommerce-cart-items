var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var cors = require('cors');



var app = express();
app.set('port',process.env.PORT || 3000);
app.set('view engine', 'html');
app.set('views',__dirname +'/public');

app.use(cors());
app.options('*', cors());
  

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(bodyParser.json({
  type: 'application/vnd.api+json'
}));

app.engine('html',require('ejs').renderFile);
app.use(express.static(path.join(__dirname,'public')));


var server = http.createServer(app);
server.listen(app.get('port'),'0.0.0.0',function(){
  console.log('Express server listening on port: '+ app.get('port'));
});


app.get("/", function(req,res){
  res.render(__dirname + '/login.html');
});

app.get("/register", function(req,res){
  res.render(__dirname + '/registration.html');
});

app.get("/landing", function(req,res){
    res.render(__dirname + '/landing.html');
});
  
app.get("/cart",function(req,res){
    res.render(__dirname + '/cart.html')
})
  