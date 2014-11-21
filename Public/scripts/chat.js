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
window.addEventListener("load", Ready);
$("#btnSend").click(function () {
  sendMsg();
});
socket.on('NewMsg', function (data) {
  $("#idMessages").prepend(
    "<div class=\"col-md-6 col-md-offset-3 maintext messcls\">" + data.msg +
    "</div>");
});

function runScript(e) {
  if (e.keyCode == 13) {
    sendMsg();
  }
}


function sendMsg() {
  var queryParams = getUrlVars();
  if (document.getElementById('FileBox').value !== "") {

    //   var FReader = new FileReader();
    //   console.log(FReader);
    //   //document.getElementById('UploadArea').innerHTML = Content;
    //   FReader.onload = function (evnt) {
    //
    //     socket.emit('Upload', {
    //       'Name': SelectedFile.name,
    //       Data: evnt.target.result,
    //       room: queryParams.room,
    //       nickname: queryParams.nickname
    //     });
    //   };
    //   FReader.readAsText(SelectedFile);
    var formData = new FormData();

    formData.append('file', SelectedFile);


    // now post a new XHR request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload');
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('all done: ' + xhr.status);
      } else {
        console.log('Something went terribly wrong...');
      }
    };

    xhr.send(formData);
  }

  var msg = {
    msg: $("#txtMsg").val(),
    room: queryParams.room,
    nickname: queryParams.nickname
  };
  socket.emit('msg', msg);

  $("#txtMsg").val("");
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
  SelectedFile = this.files[0];
  console.log(SelectedFile);
}
