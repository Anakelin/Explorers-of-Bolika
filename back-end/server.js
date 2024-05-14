const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
//const serverCmd = require('./server-util/server_functions.cjs');
const path = require('path');

const SQLITE3 = require('sqlite3').verbose();
const DBLOCATION = __dirname + '/data/test.db';
const QUERIES = require('./server-util/queries.cjs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 2020;
const landingPage = './front-end/sign_in.html';
const directory = './front-end';

//get database
let db = new SQLITE3.Database(DBLOCATION, SQLITE3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

//load page to localhost
app.get('/', (req, res) => {
    res.sendFile(path.resolve(landingPage));
});

//load the required files for the interface
app.use(express.static(directory));

let userSockets = {};

io.on('connection', (socket) => {
    userSockets[socket.id] = socket;
    console.log('user connected to server');
    console.log('player count : ' + Object.keys(userSockets).length);
    io.emit('playerCount', Object.keys(userSockets).length);

    socket.on('disconnect', () => {
        delete userSockets[socket.id];
        console.log('user disconnected');
        console.log('player count : ' + Object.keys(userSockets).length);
        io.emit('playerCount', Object.keys(userSockets).length);
    });

    socket.on('checkUser', (data) => {
        db.all(QUERIES.ACCOUNT_DATA, data[0], data[1], function (err, user) {
            if (user.length != 0) {
                db.all(QUERIES.TORCHBEARER_DATA, function (err, chars) {
                    console.log(chars);
                    socket.emit('userLogin-success', [user[0], chars]);
                });
            } else {
                socket.emit('userLogin-failed');
            }
        });
    });

    socket.on('requestSkills', (charId) => {
        db.all(QUERIES.SKILL_DATA, charId, function (err, skills) {
            db.all(QUERIES.SHARED_SKILL, function (err, shared) {
                socket.emit('receiveSkills', { skills, shared });    
            })
        });
    })
});

// Start the server
server.listen(port, () => {
    console.log('Server Started.\nYou can now enter the site through http://localhost:' + port);
});