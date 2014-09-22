
var io= require("socket.io")();
var http= require("http");
var url= require("url");
var fs=require("fs");
var path= require("path");

var port = process.env.PORT || 3838;

var server=http.createServer(function(request,response)
{
    var pathn= url.parse(request.url).pathname;
    var combinePath= __dirname+'\\'+path.basename(pathn);
    response.write("hello");
    console.log(combinePath);

    switch(path.basename(pathn)){
            case '/':
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write('hello world');
                break;
            case 'chat.html':
                fs.readFile(combinePath, function(error, data){

                    if (error){
                        response.writeHead(404);
                        response.write(error);
                    }
                    else{
                        console.log(data);
                        response.writeHead(200, {"Content-Type": "text/html"});
                        response.end(data);
                    }
                });
                break;
            default:
                response.writeHead(404);
                response.write("default");
                break;
        }


});

server.listen(port);

io.listen(server);

io.on('connection', function(socket){
    socket.on('msg',function(data)
    {
        console.log(data);
        socket.broadcast.emit('broadcastMsg', data);
    })
})


