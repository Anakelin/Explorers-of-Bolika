var userHp = getDiv("user-hp-bar");
var userEn = getDiv("user-en-bar");
var monsterHp = getDiv("monster-hp-bar");
var monsterEn = getDiv("monster-en-bar");

const chars = {
    player: "player",
    monster: "monster"
};

const maxUserHp = 100;
const maxUserEn = 50;
const maxMonsterHp = 100;
const maxMonsterEn = 50;

var currentUserHp = maxUserHp;
var currentUserEn = maxUserEn;
var currentMonsterHp = maxMonsterHp;
var currentMonsterEn = maxUserEn;

const maxUserWidthHp = userHp.offsetWidth;
const maxUserWidthEn = userEn.offsetWidth;
const maxMonsterWidthHp = monsterHp.offsetWidth;
const maxMonsterWidthEn = monsterEn.offsetWidth;

function isBattle() {
    return Math.floor(Math.random() * 4) % 3 == 0;
}

function startBattle() {
    getDiv("explore-box").classList.add("unload");
    getDiv("battle-box").classList.add("load");
    getDiv("curtain").classList.add("active-curtain");
}

function endBattle(isWin) {
    if (isWin) {
        getDiv("curtain").classList.remove("active-curtain");
        getDiv("explore-box").classList.remove("unload");
        getDiv("battle-box").classList.remove("load");    
    }
}

function playHp(value, target) {
    if (target == chars.player) {
        currentUserHp += value;
        var currentWidth = currentUserHp * maxUserWidthHp / maxUserHp;
        if (currentWidth <= 0) {
            userHp.style.width = "0px";
        } else if (currentWidth > maxUserWidthHp) {
            userHp.style.width = maxUserWidthHp + "px";
        } else {
            userHp.style.width = currentWidth + "px";
        }
    } else {
        currentMonsterHp += value;
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
        currentUserEn += value;
        // maxWidth : max = width : currentVal -> width = currentVal * maxWidth / max
        var currentWidth = currentUserEn * maxUserWidthEn / maxUserEn;
        if (currentWidth <= 0) {
            userEn.style.width = "0px";
        } else if (currentWidth > maxUserWidthEn) {
            userEn.style.width = maxUserWidthEn + "px";
        } else {
            userEn.style.width = currentWidth + "px";
        }
    } else {
        currentMonsterEn += value;
        // maxWidth : max = width : currentVal -> width = currentVal * maxWidth / max
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