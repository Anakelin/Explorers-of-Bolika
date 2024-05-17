const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
//const serverCmd = require('./server-util/server_functions.cjs');
const path = require('path');

const SQLITE3 = require('sqlite3').verbose();
const DBLOCATION = path.join(__dirname, '..', 'data', 'test.db');
console.log((DBLOCATION));
const QUERIES = require('./queries.cjs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 2020;
const landingPage = './front-end/sign_in.html';
const directory = './front-end';
const fs = require('fs');
const maps = require('./maps.cjs');
/**
const m = {
    Wall: "Wall",
    Hall: "Hall",
    Room: "Room",
    Loot: "Loot",
    Fire: "Fire",
    Enem: "Enem",
    Spawn: "Spawn"
};
 */
// Example JavaScript object

//console.log(JSON.stringify(maps));
// Convert the JavaScript object to a JSON string
let db = new SQLITE3.Database(DBLOCATION, SQLITE3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the database.');
    }
});

//const jsonData = JSON.stringify(maps, null, 2); // The second argument (null) and third argument (2) are for formatting
const max10 = 10;
var locations = Object.keys(maps);
//console.log(maps[locations[0]]);
var users = Object.keys(maps[locations[0]]).length;
var maxUsers = users < max10 ? users : max10;


//var map = maps[locations[0]][`ruins${i}`];

db.all(QUERIES.DROP_ROWS_TABLE);
db.all(QUERIES.CREATE_ROWS_TABLE);

db.serialize(() => {
    // Start a transaction
    db.run("BEGIN TRANSACTION");

    // Prepare the insert statement
    let stmt = db.prepare(QUERIES.INSERT_ROW);

    // Insert each row
    for (let i = 0; i < locations.length; i++) {
        var mapIndex = Object.keys(maps[locations[i]]);
        for (let j = 0; j < mapIndex.length; j++) {
            map = maps[locations[i]][mapIndex[j]];
            for (let k = 0; k < max10; k++) {
                stmt.run(mapIndex[j], map[k][0], map[k][1], map[k][2], map[k][3], map[k][4], map[k][5], map[k][6], map[k][7], map[k][8], map[k][9]);
            }
        }
    }

    // Finalize the statement
    stmt.finalize();

    // Commit the transaction
    db.run("COMMIT", (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Transaction committed.');
        }
    });
});

/*
CREATE TABLE "Row" (
    "id"	INTEGER NOT NULL UNIQUE,
    "cell0"	INTEGER,
    "cell1"	INTEGER,
    "cell2"	INTEGER,
    "cell3"	INTEGER,
    "cell4"	INTEGER,
    "cell5"	INTEGER,
    "cell6"	INTEGER,
    "cell7"	INTEGER,
    "cell8"	INTEGER,
    "cell9"	INTEGER,
    "map" INTEGER,
    FOREIGN KEY("cell0") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell1") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell2") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell3") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell4") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell5") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell6") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell7") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell8") REFERENCES "Cell"("type"),
    FOREIGN KEY("cell9") REFERENCES "Cell"("type"),	
    FOREIGN KEY("map") REFERENCES "Map"("id"),
    PRIMARY KEY("id" AUTOINCREMENT)
);
 */
