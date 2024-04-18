-- SQLite
/*
CREATE TABLE IF NOT EXISTS Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    name char(16) not null UNIQUE,
    email char(16) not null UNIQUE,
    password int(16) not null UNIQUE
);

CREATE TABLE IF NOT EXISTS Request (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    hero INTEGER,
    purchaseDate TEXT,
    state TEXT
);
*/
/*
INSERT INTO Users (name,email,password)
VALUES("HackerPizzaiolo","Hacker@gmail.com","1234")
*/

SELECT TRUE FROM Users WHERE name = 'HackerPizzaiolo' AND password = 1234