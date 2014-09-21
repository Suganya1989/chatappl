//var io = require("socket.io")();
var http = require("http");
// var url = require("url");
// var fs = require("fs");
// var path = require("path");

var port = process.env.PORT || 3838;

var server = http.createServer(function(request, response) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Hello World\n');
    }.listen(port);
