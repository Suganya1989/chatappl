var socket = io.connect();

$(document).ready(function () {
  var queryParams = getUrlVars();

  var msg = {
    msg: queryParams.nickname + " joined the chat.",
    room: queryParams.room,
    nickname: queryParams.nickname
  };

  socket.emit('msg', msg);

  $("#idWelcome").append("Welcome " + queryParams.nickname);

});
window.addEventListener("load", Ready);
$("#btnSend").click(function () {
  sendMsg();
});
socket.on('NewMsg', function (data) {
  $("#idMessages").prepend(
    "<div class=\"col-md-4 col-md-offset-3 bscomponent maintext messcls\">" +
    data.msg +
    "</div>");
});

socket.on('NewImageMsg', function (data) {
  $("#idMessages").prepend(
    "<div class=\"col-md-4 col-md-offset-3 maintext messcls\">" + data.from +
    " : " + "<img class=\"imgClass\" src=\"" + data.msg + "\"/>" +
    "</div>");
  document.getElementById('attachedFiles').innerHTML = "";
});

function runScript(e) {
  if (e.keyCode == 13) {
    sendMsg();
  }
}


function sendMsg() {
  var queryParams = getUrlVars();
  if (document.getElementById('FileBox').value !== "") {
    var file = SelectedFile;
    var fr = new FileReader();
    fr.onload = function (evt) {
      socket.emit('file2', {
        data: evt.target.result,
        room: queryParams.room,
        nickname: queryParams.nickname
      });
    };
    fr.readAsDataURL(file);

  }
  if ($("#txtMsg").val() !== "") {
    var msg = {
      msg: $("#txtMsg").val(),
      room: queryParams.room,
      nickname: queryParams.nickname
    };
    socket.emit('msg', msg);

    $("#txtMsg").val("");

  }
  document.getElementById('FileBox').value = "";
}

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


function Ready() {
  if (window.File && window.FileReader) { //These are the relevant HTML5 objects that we are going to use
    document.getElementById('FileBox').addEventListener('change', FileChosen);
  } else {
    document.getElementById('UploadArea').innerHTML =
      "Your Browser Doesn't Support The File API Please Update Your Browser";
  }
}
var SelectedFile;

function FileChosen(evnt) {
  SelectedFile = evnt.target.files[0];
  if (SelectedFile === undefined) {
    document.getElementById('attachedFiles').innerHTML = "";
  }
  document.getElementById('attachedFiles').innerHTML = SelectedFile.name;
  console.log(SelectedFile);
}
