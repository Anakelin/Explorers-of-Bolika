// .\back-end\dependencies\node\npm start --prefix .\back-end

//BACK-END
const QUERIES = require('./server-util/queries.cjs');
const SERVERCMD = require('./server-util/server_functions.cjs');
const SQLITE3 = require('sqlite3').verbose();
const DBLOCATION = './data/test.db';

let mydb = new SQLITE3.Database(DBLOCATION,(err) => {
  if (err) {
    console.error(err.message);
  } else{
    console.log('Created database.');
  }
});
mydb.close();

let db = new SQLITE3.Database(DBLOCATION, SQLITE3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else{
    console.log('Connected to the database.');
  }
});

//test write
/*
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Request (Id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, hero INTEGER, purchaseDate TEXT, state TEXT)`);

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO Request (userId, hero, purchaseDate, state)
    VALUES ( ?, ?, ?, ?);`
  );

  for (let i = 0; i < 6; i++) {
      const date = new Date().toISOString().split('T')[0];
      let userId = i < 3 ? 0 : 1;
      let state = i %3 == 0 ? "Pending" : i % 2 == 0 ? "Solved" : "Denied" ;
      stmt.run(userId,0,date,state);
  }
  stmt.finalize();
});
*/
//test read
/*
let sql = `SELECT * FROM lorem`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.name);
  });
});
*/
// open the database

// close the database connection


//FRONT-END

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = 2020;
const page = '/'+'sign_in.html';
const directory ='./../front-end';
const landingPage = page;
//const landingPage = './../front-end/log_in.html';
var path = require('path');

app.get('/', (req, res) => { 
    res.sendFile(path.resolve(landingPage)); 
});

//load the required files for the interface
app.use(express.static(directory));

//server console msg

let userSockets = {};
let isAlive = false;
io.on('connection', (socket) => {
  userSockets[socket.id] = socket;
  console.log('user connected');
  console.log('player count : '+ Object.keys(userSockets).length);
  io.emit('playerCount', Object.keys(userSockets).length);
  
  socket.on('pageLeave', () => {
    console.log('User left the page');
    isAlive = true;
  });

  socket.on('disconnect', () => {
    delete userSockets[socket.id];
    if(isAlive) {
      isAlive = false;
    } else {
      console.log('user disconnected');
      console.log('player count : ' + Object.keys(userSockets).length);
      io.emit('playerCount', Object.keys(userSockets).length);

      if (Object.keys(userSockets).length == 0) {
          db.close();
          console.log('Closing server...');
          server.close();
      }
    }
  });
  /*
  socket.on('requestReport', (userId) => {
    let query = `SELECT id, hero, state FROM Request WHERE userId = ${userId}`;
    db.all(query, function(err, query) {  
      socket.emit('receiveReport', query);
    });
  })

  socket.on('deleteSolved', (userId) => {
    let query = `DELETE FROM Request WHERE userId = ${userId} AND state = "Solved"`;
    db.all(query, function(err, query) {  
      socket.emit('deleteSolvedResponse');
    });
    
  })
  */
  socket.on('checkUser', (data) => {
    db.all(QUERIES.ACCOUNT_DATA,data[0],data[1], function (err, user) {  
      if (user.length != 0) {
        db.all(QUERIES.TORCHBEARER_DATA, function (err, chars) {
          console.log(chars);
          db.all(QUERIES.SKILL_DATA, function (err, skills) {
            console.log(skills);
            socket.emit('userLogin-success', [user[0], chars,skills]);
          });
        });
        
      } else {
        socket.emit('userLogin-failed');
      }
    });
  })

});

server.listen(port, () => {
    console.log('Server Started.\nYou can now enter the site through http://localhost:'+port+page);
});
