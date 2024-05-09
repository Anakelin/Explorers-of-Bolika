
const torchbearer = localStorage.getItem('torchbearer');
var userLocation = `./resources/media/char/torchbearers/${torchbearer['name']}/`;
var enemyLocation = "./resources/media/char/torchbearers/Rot_King/";

function startGame() {
    createMap();
    preload(
        userLocation + "base.png",
        userLocation + "defend.png",
        userLocation + "0.png",
        userLocation + "1.png",
        userLocation + "2.png",
        userLocation + "3.png"
    );

    preload(
        enemyLocation + "base.png",
        enemyLocation + "defend.png",
        enemyLocation + "0.png",
        enemyLocation + "1.png",
        enemyLocation + "2.png",
        enemyLocation + "3.png"
    );
    //resetChar();
}
var userSprites = [];
var enemySprites = [];
const spritesUsed = 6;
function preload() {
    for (var i = 0; i < arguments.length; i++) {

        if (userSprites.length < spritesUsed) {
            userSprites[i] = preload.arguments[i];
        } else {
            enemySprites[i] = preload.arguments[i];
        }
    }
}
//console.log(localStorage.getItem("IsLogged"));
window.onload = startGame;