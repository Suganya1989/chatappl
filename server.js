var http = require('http');
var port = process.env.PORT || 3838;
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello World\n');
}).listen(port);
server.listen(port);
var io = require("socket.io")(server);
