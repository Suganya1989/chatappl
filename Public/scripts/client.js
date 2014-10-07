$("#idGoogle").click(function(){
    var url=$(location).attr('href');
    url=url+'auth/google';
    window.location.replace(url);
});

var socket=io.connect();
io.on('profile',function(data){
    console.log(profile);
})