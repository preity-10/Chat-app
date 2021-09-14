//node server which will handle socket io connection
// const io = require('socket.io')(8000);
// server-side
const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:8080",
    credentials: true
  }
});
const users = {};

//io.on is an instance of socket.io n will listen a lot of connections
io.on('connection',socket => {
  //socket.on will handle the particular connection
  socket.on('new-user-joined',name =>{
    console.log("New user",name);
    users[socket.id] = name;  //appending name as id in users
    socket.broadcast.emit('user-joined',name); //tell everyone that this user has joined
  });

  socket.on('send',message => {
    socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
  });

  socket.on('disconnect',message => {
    socket.broadcast.emit('leave',users[socket.id]);
    delete users[socket.id];
  });

})
