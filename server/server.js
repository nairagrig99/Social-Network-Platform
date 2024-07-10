const express = require('express');
let userNames = '';
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
})
app.get('/', (req, res) => {
  res.send(userNames)
})
http.listen(3000, () => {
  console.log('listening on *:3000');
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;

  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});


io.on("connection", (socket) => {
  // fetch existing users
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.join(socket.id);

  socket.emit("users", users);

  // notify existing users
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });

  // forward the private message to the right recipient
  socket.on("private message", ({content, to}) => {
    const data = {
      content,
      from: socket.id,
    }
    socket.to(to).emit("private message", data);
  });

  // notify users upon disconnection
  socket.on("disconnect", () => {
    socket.broadcast.emit("user disconnected", socket.id);
  });
});

// const Websocket = require('ws');
// const server = new Websocket.Server({port: 3000});
//
// let clients = {};
//
// server.on('connection', socket => {
//
//   socket.on('message', message => {
//
//     const data = JSON.parse(message);
//
//     // console.log('data', data);
//     if (data.type === 'register') {
//       console.log('register', data);
//       clients[data.userId] = socket;
//     } else if (data.type === 'friend-request') {
//
//       const recipientSocket = clients[data.recipientId];
//       console.log('friend-request', data.senderName);
//       if (recipientSocket) {
//         recipientSocket.send(JSON.stringify({
//           type: 'notification',
//           message: `You have a new friend request from ${data.senderName}`,
//           senderUserId: data.recipientId,
//         }));
//       }
//     }
//     // console.log('clients', clients);
//   });
//
//   socket.on('close', () => {
//     for (let userId in clients) {
//       if (clients[userId] === socket) {
//         delete clients[userId];
//       }
//     }
//   });
// });


