var express = require('express');
var app = express();
var url = require('url');
var http = require('http');



var url = require('url');
var path = require('path');

var port = process.env.PORT || 3838;
var room = [];
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
    console.log("Hellooooooooooooooooooooooooo");
    socket.join(data.name);
    console.log("Joined in room:" + data.name);
  });
  socket.on('msg', function (data) {
    console.log("Hello" + data.room);

    socket.broadcast.to(data.room).emit('NewMsg', {
      msg: data.msg
    });

  });
});
