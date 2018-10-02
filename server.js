var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

var server = express();

var projects = [];

//middlewares
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.set('view engine', 'ejs');
server.set('views',path.join(__dirname,'views'))
server.get ('/', function(req,res){
    if (Object.keys(req.query).length !== 0){
        projects.push(req.query)
    }
    res.render("index",{
        projects:projects
    });
});

server.get ('/clear', function(req,res){
    projects = [];
    res.redirect('/');
});

server.listen(8080,function(){
console.log("server has started");
});