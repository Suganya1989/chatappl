var socket = io.connect();
$(document).ready(function () {
  var queryParams = getUrlVars();

  var msg = {
    msg: queryParams.nickname + " joined the chat.",
    room: queryParams.room,
    nickname: queryParams.nickname
  };

  socket.emit('msg', msg);

  $("#idWelcome").append(" " + queryParams.nickname);

});

$("#btnSend").click(function () {
  var queryParams = getUrlVars();
  var msg = {
    msg: $("#txtMsg").val(),
    room: queryParams.room,
    nickname: queryParams.nickname
  };
  socket.emit('msg', msg);
});
socket.on('NewMsg', function (data) {
  $("#idMessages").prepend(
    "<div class=\"col-md-6 col-md-offset-3 maintext messcls\">" + data.msg +
    "</div>");
});

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') +
    1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
  }
  return vars;
}
