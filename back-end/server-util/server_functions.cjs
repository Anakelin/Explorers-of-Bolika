const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const app = express();
let isAlive = false;
let userSockets = {};
const landingPage = './front-end/sign_in.html';
const directory = './../front-end';
var path = require('path');



function addPlayer(socket,io) {
    userSockets[socket.id] = socket;
    console.log('user connected');
    console.log('player count : ' + Object.keys(userSockets).length);
    io.emit('playerCount', Object.keys(userSockets).length);
}

function keepConnection() {
    console.log('User left the page');
    isAlive = true;
}

function killConnection(socket,io,db,server) {
    delete userSockets[socket.id];
    if (isAlive) {
        isAlive = false;
    } else {
        console.log('user disconnected');
        console.log('player count : ' + Object.keys(userSockets).length);
        io.emit('playerCount', Object.keys(userSockets).length);

        if (Object.keys(userSockets).length == 0) {
            killServer(db,server);
        }
    }
}

function killServer(db,server) {
    //db.close();
    server.close();
}

function genServer() {
    //set landing page
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(landingPage));
    })

    //load the required files for the interface
    app.use(express.static(directory));
    const server = http.createServer(app);
    const io = new Server(server);
    return listenPorts(server,io);
}

function listenPorts(server,io) {
    io.on('connection', (socket) => {
        addPlayer();

        socket.on('pageLeave', () => {
            keepConnection();
        })
    });
    server.on('closeServer', () => {
        killServer(server);
    });
    return {server,io}
}

module.exports = {
    genServer
};