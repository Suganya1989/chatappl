var express= require('express');
var app= express()
var http = require('http')
var server = http.createServer(app);
var io = require('socket.io')().listen(server);
var url =require('url');
var path= require('path');
var passport= require('passport');
var GoogleStrategy=require('passport-google').Strategy;
var isAuthenticated= false;
app.use(passport.initialize());
app.use(passport.session());
var port = process.env.PORT || 3838;
app.set('views',__dirname+'/public/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname,'public')));
var googlepassport = require('./passportGoogle.js');
var urlhost;

app.get('/', function(req,res){
    urlhost=req.get('host');
    res.render("index");
});

app.get('/:viewname',function(req,res){
  res.render(req.params.viewname);
})


app.get('/auth/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res){

  });

app.get('/auth/google/return',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    //console.log(req.profile);
    // Successful authentication, redirect home.
    isAuthenticated==true;
    console.log(req.user);
    res.redirect('/chat');
  });

server.listen(port);
app.listen(server);
module.exports.urlhost=urlhost;