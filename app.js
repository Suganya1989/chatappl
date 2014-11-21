var express = require('express');
var app = express();
var url = require('url');
var http = require('http');



var url = require('url');
var path = require('path');

var port = process.env.PORT || 3838;

app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render("index");
});

app.get('/:viewname', function (req, res) {
  res.render(req.params.viewname);
});
app.all('/:action', function (req, res) {});
var server = http.createServer(app).listen(port);

var io = require('socket.io')();
io.listen(server);
io.on('connection', function (socket) {
  console.log("socket created");
  socket.on('RoomCreated', function (data) {
    socket.emit('joinedroom', data.name);
  });
  // socket.on('joinedchat',function(data){
  //   socket.room = data.room;
  //   socket.join(socket.room);
  //
  // });
  socket.on('msg', function (data) {
    socket.room = data.room;
    socket.join(socket.room);
    console.log(data.msg);
    socket.emit('NewMsg', {
      msg: data.nickname + " : " +
        data.msg
    });
    socket.in(data.room).emit('NewMsg', {
      msg: data.nickname + " : " +
        data.msg
    });

  });



});
