const express = require('express');
const app = express();
const hhtp = require('http');
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());

const server = hhtp.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const connectedUsers = [];

io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data.room}`);
        connectedUsers.push(data.userName);
        io.emit('users', Object.values(connectedUsers));

    });

    socket.on('connect', () => {
        const username = 'Nom d utilisateur';
        socket.emit('login', username);
    });

    socket.on('send_message', (data) => {
        console.log(data);
        socket.to(data.room).emit('receive_message', data);
    });



    socket.on('typing', (data) => {
        socket.broadcast.emit('user-typing', data);
    }, [socket]);

    socket.on('typing-stop', (data) => {
        socket.broadcast.emit('user-typing-stop', data);
    }, [socket]);

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        delete connectedUsers[socket.id];
        io.emit('users', Object.values(connectedUsers));
    });
});

server.listen(8000, () => {
    console.log('Server running on port 8000');
});