var io = require("socket.io")();
var http = require("http");
var static = require('node-static');

var port = process.env.PORT || 3838;
var file = new static.Server('./public');


var server = http.createServer(function(request, response) {
   request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});

server.listen(port);

io.listen(server);

io.on('connection', function(socket) {
    socket.on('msg', function(data) {
        console.log(data);
        socket.broadcast.emit('broadcastMsg', data);
    })
})
