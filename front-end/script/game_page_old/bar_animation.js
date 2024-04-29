var userHp = getDiv("user-hp-bar");
var userEn = getDiv("user-en-bar");
var enemyHp = getDiv("enemy-hp-bar");
var enemyEn = getDiv("enemy-en-bar");

const maxUserHp = 100;
const maxUserEn = 50;
const maxEnemyHp = 100;
const maxEnemyEn = 50;

var currentUserHp = maxUserHp;
var currentUserEn = maxUserEn;
var currentEnemyHp = maxEnemyHp;
var currentEnemyEn = maxUserEn;

const maxUserWidthHp = userHp.offsetWidth;
const maxUserWidthEn = userEn.offsetWidth;
const maxEnemyWidthHp = enemyHp.offsetWidth;
const maxEnemyWidthEn = enemyEn.offsetWidth;

function resetEnemy() {
    currentEnemyHp = maxEnemyHp;
    currentEnemyEn = maxEnemyEn;
    changeEnemyEn(0);
    changeEnemyHp(0);
}

function changeUserHp(value) {
    currentUserHp += value;
    // maxWidth : max = width : currentVal -> width = currentVal * maxWidth / max
    var currentWidth = currentUserHp * maxUserWidthHp / maxUserHp; 
    if(currentWidth <= 0) {
        userHp.style.width = "0px";    
    } else if (currentWidth > maxUserWidthHp) {
        userHp.style.width = maxUserWidthHp +"px";
    } else {
        userHp.style.width = currentWidth +"px";
    }
    
}

function changeUserEn(value) {
    currentUserEn += value;
    // maxWidth : max = width : currentVal -> width = currentVal * maxWidth / max
    var currentWidth = currentUserEn * maxUserWidthEn / maxUserEn; 
    if(currentWidth <= 0) {
        userEn.style.width = "0px";    
    } else if (currentWidth > maxUserWidthEn) {
        userEn.style.width = maxUserWidthEn +"px";
    } else {
        userEn.style.width = currentWidth +"px";
    }
    
    
}

function changeEnemyHp(value) {
    currentEnemyHp += value;
    // maxWidth : max = width : currentVal -> width = currentVal * maxWidth / max
    var currentWidth = currentEnemyHp * maxEnemyWidthHp / maxEnemyHp; 
    if(currentWidth <= 0) {
        enemyHp.style.width = "0px";    
    } else if (currentWidth > maxEnemyWidthHp) {
        enemyHp.style.width = maxEnemyWidthHp +"px";
    } else {
        enemyHp.style.width = currentWidth +"px";
    }
    if(currentEnemyHp <= 0) {
        endBattleFlip();
        resetEnemy();
    }
    
}

function changeEnemyEn(value) {
    currentEnemyEn += value;
    // maxWidth : max = width : currentVal -> width = currentVal * maxWidth / max
    var currentWidth = currentEnemyEn * maxEnemyWidthEn / maxEnemyEn; 
    if(currentWidth <= 0) {
        enemyEn.style.width = "0px";    
    } else if (currentWidth > maxUserWidthHp) {
        enemyEn.style.width = maxUserWidthHp +"px";
    } else {
        enemyEn.style.width = currentWidth +"px";
    }
    
}

userHp.onclick = function () {
    changeUserHp(-25);
    changeUserEn(-25);
};

enemyHp.onclick = function () {
    changeUserHp(50);
    changeUserEn(50);
}