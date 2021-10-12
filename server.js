const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require('socket.io').listen(server)
server.listen(3000);

const list_user = [];
io.sockets.on("connection", (socket) => {
  console.log("user connecting...");
  socket.on("user_login", (user_name) => {
		console.log(user_name)
    if (list_user.indexOf(user_name) > -1) {
      return;
    }
    list_user.push(user_name);
    socket.user = user_name;
  });

  socket.on("send_message", (message) => {
		console.log(message)
    io.sockets.emit("receiver_message", { data: socket.user + ": " + message });
  });
});
