const QUERIES = 
{
    ACCOUNT_DATA:
        `
        SELECT username,email,currency,win,loss
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
        WHERE s.torchbearer = ? OR s.id = 1
        ORDER by s.torchbearer;
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
    UPDATE_ACCCOUNT_END_EXPLORE:
        `
        UPDATE PLAYER
        SET currency = ?
        WHERE username = ?
        AND password = ?;
        `
    ,
    REQUEST_REQUEST_DATA: ``,
    REQUEST_DELETE: ``,
};
module.exports = QUERIES;