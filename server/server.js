const express = require('express');
const cors = require('cors');
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

io.use((socket, next) => {
    const username = socket.handshake.auth.username;

    if (!username ) {
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

http.listen(3000, () => {
    console.log('Server is running');
})
