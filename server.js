var io = require("socket.io")();
var http = require("http");
var url = require("url");
var fs = require("fs");
var path = require("path");
var send=require('send');

var port = process.env.PORT || 3838;

var server = http.createServer(function(request, response) {
    function error(err) {
        response.statusCode = err.status;
        response.end(http.STATUS_CODES[err.status]);
    }

    send(request,request.url,{root:__dirname})
      .on('error', error)
      .pipe(response);
});

server.listen(port);

io.listen(server);

io.on('connection', function(socket) {
    socket.on('msg', function(data) {
        console.log(data);
        socket.broadcast.emit('broadcastMsg', data);
    })
})
