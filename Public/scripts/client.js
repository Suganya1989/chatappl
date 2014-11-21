$("#btnRoom").click(function () {

  var socket = io.connect();
  var room = {
    name: $("#idRoom").val(),
    owner: $("#idEmail").val(),
    nickname: $("#idName").val()
  };
  socket.emit('RoomCreated', room);
  socket.on('joinedroom', function (data) {
    window.location.href = '/chat?room=' + $("#idRoom").val() +
      "&nickname=" + $("#idName").val();
  });
});
