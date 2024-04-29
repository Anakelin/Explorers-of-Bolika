var userLocation = "./resources/game_page/char/default/";
var enemyLocation = "./resources/game_page/char/rotten/";

function startGame() {
    createMap();
    preload(
        userLocation+"base.png",
        userLocation+"defend.png",
        userLocation+"0.png",
        userLocation+"1.png",
        userLocation+"2.png",
        userLocation+"3.png"
    );

    preload(
        enemyLocation+"base.png",
        enemyLocation+"defend.png",
        enemyLocation+"0.png",
        enemyLocation+"1.png",
        enemyLocation+"2.png",
        enemyLocation+"3.png"
    );
    resetChar();
}
var userSprites = [];
var enemySprites = [];
const spritesUsed = 6;
function preload() {
    for (var i = 0; i < arguments.length; i++) {
        
        if(userSprites.length < spritesUsed) {
            userSprites[i] = preload.arguments[i];   
        } else {
            enemySprites[i] = preload.arguments[i];
        }
    }
}

window.onload = startGame;