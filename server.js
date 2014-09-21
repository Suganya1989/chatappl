var http = require('http');
var io= require('socket.io')();
var port = process.env.PORT || 3838;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);

