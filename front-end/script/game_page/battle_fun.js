var userHp = getDiv("user-hp-bar");
var userEn = getDiv("user-en-bar");
var monsterHp = getDiv("monster-hp-bar");
var monsterEn = getDiv("monster-en-bar");
const DATALIMIT = 1000;
const chars = {
    player: "player",
    monster: "monster"
};

const torchbearer = JSON.parse(localStorage.getItem('torchbearer'));
var maxUserHp = torchbearer['maxHP'];
var maxUserEn = torchbearer['maxEN'];
var currentUserHp = maxUserHp;
var currentUserEn = maxUserEn;

var enemyLocation;
var monster;
var maxMonsterHp = 0;
var maxMonsterEn = 0;
var currentMonsterHp = 0;
var currentMonsterEn = 0;

const maxUserWidthHp = userHp.offsetWidth;
const maxUserWidthEn = userEn.offsetWidth;
const maxMonsterWidthHp = monsterHp.offsetWidth;
const maxMonsterWidthEn = monsterEn.offsetWidth;

var user = JSON.parse(localStorage.getItem('user'));

function isBattle() {
    return Math.floor(Math.random() * 4) % 3 == 0;
}

function startBattle(type) {
    localStorage.setItem("isRoundDone", 1);
    var monsters;
    if (type === "Hall") {
        monsters = JSON.parse(localStorage.getItem('monstersHall'));
    } else {
        monsters = JSON.parse(localStorage.getItem('monstersRoom'));
    }
    var randomMonsterId = Math.floor(Math.random() * 2);
    monster = monsters[randomMonsterId];
    var diff = parseFloat(localStorage.getItem('diff'));
    maxMonsterHp = monster['maxHP'] + monster['maxHP'] * diff;
    maxMonsterEn = monster['maxEn'] + monster['maxEn'] * diff;
    currentMonsterHp = maxMonsterHp;
    currentMonsterEn = maxMonsterEn;
    enemyLocation = `./resources/media/char/enemy/${monster['location']}/${monster['filename']}`;    
    getDiv(monsterSpriteId).style = `background-image: url("${enemyLocation}/base.png");`;
    
    getDiv("explore-box").classList.add("unload");
    getDiv("battle-box").classList.add("load");
    getDiv("curtain").classList.add("active-curtain");
}

function endBattle(isWin) {
    getDiv("curtain").classList.remove("active-curtain");
    getDiv("battle-box").classList.remove("load");   
    if (isWin) {
        getDiv("explore-box").classList.remove("unload");
        var money = parseInt(localStorage.getItem('explore-meta-money'));
        var monsterMoney = (maxMonsterHp + maxMonsterEn) / 10 * mapDifficulty;
        var shards = parseInt(localStorage.getItem('explore-meta-shards'));
        var monsterShards = (maxMonsterHp + maxMonsterEn) / 2 * (2 / mapDifficulty);
        var experience;

        if (monster['type'] == "Room") {
            monsterShards *= 1.5;
            experience = 10 * mapDifficulty;
        } else {
            experience = 30 * mapDifficulty;
        }

        shards += Math.floor(monsterShards);
        money += Math.floor(monsterMoney) + 5;
        updateMetaData(money, shards);
    } else {
        user['loss'] = user['loss'] != DATALIMIT ? user['loss'] + 1 : user['loss'];
        user['currency'] = Math.floor(user['currency'] - (user['currency'] / 4));
        user['currency'] = user['currency'] < 0 ? 0 : user['currency'];
        alertMessage("You lost some currency when trying to escape...");
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', true);        
            socket.emit("updateAccountEndBattle", user);
        }, 1000);
        
    }
}

socket.on('updateAccountEndBattleSuccess', (user) => {
    localStorage.setItem('user', JSON.stringify(user));        
    setTimeout(() => {
        pageChange(userUrl);
    }, 1200)
});

function playHp(value, target) {
    if (target == chars.player) {
        currentUserHp = currentUserHp + value > maxUserHp ? maxUserHp : currentUserHp + value;
        currentUserHp = currentUserHp <= 0 ? 0 : currentUserHp;
        var currentWidth = currentUserHp * maxUserWidthHp / maxUserHp;
        if (currentWidth <= 0) {
            userHp.style.width = "0px";
        } else if (currentWidth > maxUserWidthHp) {
            userHp.style.width = maxUserWidthHp + "px";
        } else {
            userHp.style.width = currentWidth + "px";
        }
    } else {
        currentMonsterHp = currentMonsterHp + value > maxMonsterHp ? maxMonsterHp : currentMonsterHp + value;
        currentMonsterHp = currentMonsterHp <= 0 ? 0 : currentMonsterHp;
        // maxWidth : max = width : currentVal -> width = currentVal * maxWidth / max
        var currentWidth = currentMonsterHp * maxMonsterWidthHp / maxMonsterHp;
        if (currentWidth <= 0) {
            monsterHp.style.width = "0px";
        } else if (currentWidth > maxMonsterWidthHp) {
            monsterHp.style.width = maxMonsterWidthHp + "px";
        } else {
            monsterHp.style.width = currentWidth + "px";
        }
    }
}

function playEn(value, target) {
    if (target == chars.player) {
        currentUserEn = currentUserEn + value > maxUserEn ? maxUserEn : currentUserEn + value;
        currentUserEn = currentUserEn <= 0 ? 0 : currentUserEn;
        var currentWidth = currentUserEn * maxUserWidthEn / maxUserEn;
        if (currentWidth <= 0) {
            userEn.style.width = "0px";
        } else if (currentWidth > maxUserWidthEn) {
            userEn.style.width = maxUserWidthEn + "px";
        } else {
            userEn.style.width = currentWidth + "px";
        }
    } else {
        currentMonsterEn = currentMonsterEn + value > maxMonsterEn ? maxMonsterEn : currentMonsterEn + value;
        currentMonsterEn = currentMonsterEn <= 0 ? 0 : currentMonsterEn;
        
        var currentWidth = currentMonsterEn * maxMonsterWidthEn / maxMonsterEn;
        if (currentWidth <= 0) {
            monsterEn.style.width = "0px";
        } else if (currentWidth > maxUserWidthHp) {
            monsterEn.style.width = maxUserWidthHp + "px";
        } else {
            monsterEn.style.width = currentWidth + "px";
        }
    }
}

// DEBUG ONLY
function resetMonster() {
    currentMonsterHp = maxMonsterHp;
    currentMonsterEn = maxMonsterEn;
    playHp(0,chars.monster);
    playEn(0,chars.monster);
}