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

    socket.on('adminConnection', () => {
        delete userSockets[socket.id];
        io.emit('playerCount', Object.keys(userSockets).length);
    });

    socket.on('checkUser', (data) => {
        db.all(QUERIES.REQUEST_ACCOUNT_DATA, data['username'], data['password'], function (err, user) {
            if (user.length != 0) {
                db.all(QUERIES.TORCHBEARER_DATA, function (err, chars) {
                    db.all(QUERIES.CHECK_TORCHBEARER_BOUGHT,
                        user[0]['id'],
                        function (err, bought) {
                            socket.emit('userAccess-success', [user[0], chars, bought]);
                        });
                });
            } else {
                socket.emit('userAccess-failed');
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

    socket.on('checkAccountExist', (data) => {
        db.all(QUERIES.CHECK_ACCOUNT_EXISTS, data['username'], data['email'], function (err, result) {
            if (result[0]['res'] != 1) {
                db.all(QUERIES.INSERT_ACCOUNT, data['username'], data['password'], data['email']);
                socket.emit('userCreated');
            } else {
                socket.emit('userAccess-failed');
            }
        });
    })

    socket.on('requestUsersData', (charId) => {
        db.all(QUERIES.REQUEST_TOP_PLAYERS, charId, function (err, topPlayers) {
            db.all(QUERIES.REQUEST_TOTAL_PLAYERS, charId, function (err, playerTot) {
                db.all(QUERIES.REQUEST_AVG_PLAYER, charId, function (err, avgPlayer) {
                    var data = {
                        0: topPlayers,
                        1: playerTot,
                        2: avgPlayer
                    };
                    socket.emit('updateUsersData', data);
                });
            });
        });
    })

    socket.on('requestRequestsData', (data) => {
        db.all(QUERIES.REQUEST_REQUESTS_DATA,
            function (err, data) {
                socket.emit('buildTable', data);
            }
        );
    });

    socket.on('refundRequest', (rawId) => {
        var id = rawId.split("-")[1];
        socket.emit('refundMessage', true);
        /*
        db.all(QUERIES.APPLY_REFUND,
            id,
            function (err, res) {
                socket.emit('refundMessage', true);
            }
        );
        */
    });

    socket.on('refundRequestDeny', (rawId) => {
        var id = rawId.split("-")[1];
        socket.emit('refundMessage', false);
        /*
        db.all(QUERIES.DENY_REFUND,
            id,
            function (err, res) {
                socket.emit('refundMessage', false);
            }
        );
        */
    });

    socket.on('updateAccountEndBattle', (data) => {
        db.all(QUERIES.UPDATE_ACCOUNT_END_EXPLORE,
            data['currency'], data['win'], data['loss'],
            data['username'], data['password'],
            function (err, players) {
                socket.emit('updateAccountEndBattleSuccess');
            }
        );
    });

    socket.on('requestMap', (id) => {
        db.all(QUERIES.REQUEST_MAP,
            id,
            function (err, map) {
                socket.emit('receiveMap',map);
            }
        );
    });

    socket.on('requestMonsters', (data) => {
        db.all(QUERIES.REQUEST_MONSTERS,
            data['location'], data['difficulty'],
            function (err, monsters) {
                socket.emit('receiveMonsters', monsters);
            }
        );
    })

    socket.on('gameCanStart', () => {
        socket.emit('gameStart');
    });
});

// Start the server
server.listen(port, () => {
    console.log('Server Started.\nYou can now enter the site through http://localhost:' + port);
});