const QUERIES = 
{
    CHECK_ACCOUNT_EXISTS:
    `
        SELECT
            CASE
                WHEN EXISTS (
                    SELECT 1
                    FROM Player
                    WHERE username = ? OR email = ?
                ) THEN 1
                ELSE 0
            END AS res;
    `,
    INSERT_ACCOUNT:
        `
        INSERT INTO PLAYER (username,password,email)
        VALUES (?,?,?);
        `
    ,
    REQUEST_ACCOUNT_DATA:
        `
        SELECT username,email,currency,win,loss,password
        FROM PLAYER
        WHERE username = ?
        AND password = ?;
        `
    ,
    TORCHBEARER_DATA:
        `
        SELECT t.id,t.name, t.maxHP, t.maxEN, t.move, t.cost, t.desc
        FROM Torchbearer as t
        ORDER BY t.id;
        `,
    SKILL_DATA: 
        `
        SELECT s.name, s.filename, s.hpEnemy, s.enEnemy, s.hpUser, s.enUser, s.description, s.torchbearer as user
        FROM SkillHero as s
		WHERE s.torchbearer = ?
        ORDER BY s.torchbearer;
        `
    ,
    SHARED_SKILL:
        `
        SELECT s.name, s.filename, s.description
        FROM SkillShared as s
        ORDER BY s.id;
        `
    ,
    REQUEST_CURRENCY:
        `
        SELECT currency
        FROM PLAYER
        WHERE username = ?
        AND password = ?;
        `
    ,
    UPDATE_ACCOUNT_END_EXPLORE:
        `
        UPDATE PLAYER
        SET currency = ?,
		win = ?,
		loss = ?
        WHERE username = ?
        AND password = ?
        `
    ,
    REQUEST_REQUEST_DATA: ``,
    REQUEST_DELETE: ``,
    REQUEST_TOP_PLAYERS:
        `
        SELECT p.username, p.currency, p.win, p.loss
        FROM Player as p
        ORDER BY p.win DESC, p.currency DESC, p.loss ASC
		LIMIT 10
        `
    ,
    INSERT_ROW:
        `
        INSERT INTO ROW (map,cell0,cell1,cell2,cell3,cell4,cell5,cell6,cell7,cell8,cell9)
        VALUES (?,?,?,?,?,?,?,?,?,?,?);
        `
    ,
    REQUEST_MAP:
        `
        SELECT cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9
        FROM Row
        WHERE map = ?
        ORDER BY id
        `
    ,
    CREATE_ROWS_TABLE:
        `
        CREATE TABLE IF NOT EXISTS "Row" (
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
    `,
    DROP_ROWS_TABLE:
        `
        DROP TABLE IF EXISTS Row
    `,
};
module.exports = QUERIES;