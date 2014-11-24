var express = require('express');
var app = express();
var url = require('url');
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var dateFormat = require('dateformat');
var port = process.env.PORT || 3838;
app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
dateFormat.masks.hammerTime = 'HH:MM';
app.get('/', function (req, res) {
  res.render("index");
});

app.get('/:viewname', function (req, res) {
  res.render(req.params.viewname);
});
app.get('/Files/:filename', function (req, res) {
  res.sendfile("Files/" + req.params.filename);
});


app.post('/upload', function (req, res) {
  //  console.log(req);
});

app.all('/:action', function (req, res) {});
var server = http.createServer(app).listen(port);

var io = require('socket.io')();
io.listen(server);
io.on('connection', function (socket) {

  console.log("socket created");
  var datetime = new Date();

  socket.on('RoomCreated', function (data) {
    socket.emit('joinedroom', data.name);
  });

  socket.on('msg', function (data) {
    var now = new Date();
    socket.room = data.room;
    socket.join(socket.room);
    console.log(data.msg);
    socket.emit('NewMsg', {
      msg: dateFormat(new Date(), "hammerTime") + " - " + data.nickname +
        " : " +
        data.msg
    });
    socket.in(data.room).emit('NewMsg', {
      msg: dateFormat(new Date(), "hammerTime") + " - " + data.nickname +
        " : " +
        data.msg
    });

  });
  socket.on('file2', function (data) {
    socket.room = data.room;
    socket.join(socket.room);


    socket.emit('NewImageMsg', {
      from: dateFormat(new Date(), "hammerTime") + " - " + data.nickname,
      msg: data.data
    });
    socket.in(data.room).emit('NewImageMsg', {
      from: dateFormat(new Date(), "hammerTime") + " - " + data.nickname,
      msg: data.data
    });

  });



});
