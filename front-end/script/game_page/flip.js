var battleId = "combat-box";
var boardId = "board-box";
var flipBtnId = "flip-btn";
var unflipBtnId = "unflip-btn";

//Flips the combat and board boxes.

function startBattleFlip(){
    flip("combat-content");
    flip("board-content");
}

function endBattleFlip(){
    unflip("combat-content");
    unflip("board-content");
}

function flip(id) {
    unflip(id);
    getDiv(id).classList.add("flip");
}

function unflip(id) {
    getDiv(id).classList.remove("flip");
}

getDiv(flipBtnId).onclick = startBattleFlip;

getDiv(unflipBtnId).onclick = endBattleFlip;
/*
battle.onmouseover = function () {
    flip("combat-content");
};
battle.onmouseout = function () {
    unflip("combat-content");
};

grid.onmouseover = function () {
    flip("board-content");
};
grid.onmouseout = function () {
    unflip("board-content");
}; 
 */