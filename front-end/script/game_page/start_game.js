//Page requires account to access

if (localStorage.getItem('isGameStarted') === null) {
    pageChange(loginUrl);
} else {
    localStorage.removeItem('isGameStarted');
}
const dungeon = localStorage.getItem('location');
const skills = JSON.parse(localStorage.getItem('skills'));
const diff = localStorage.getItem('diff');

var userLocation = `./resources/media/char/torchbearers/${torchbearer['name']}/`;
//var enemyLocation = `./resources/media/char/enemy/${location}//`;    
var enemyLocation = `./resources/media/char/enemy/Woods/Duel_Dancer/`;    

function showDesc(text) {
    getDiv('sk-desc').innerHTML = text;
}

function startGame() {
    createMap();
    /*
    preload(
        new Image().src = userLocation + "base.png",
        new Image().src = userLocation + "defend.png",
        new Image().src = userLocation + "attack.png",
        new Image().src = userLocation + "rest.png",
    );

    preload(
        new Image().src = enemyLocation + "base.png",
        new Image().src = enemyLocation + "defend.png",
        new Image().src = enemyLocation + "attack.png",
        new Image().src = enemyLocation + "rest.png",
    );
    */
    //skills
    getDiv(`sk${3}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skills[0]['filename']}.png");`;
    getDiv(`sk${3}`).addEventListener("click", function () {
        playSkill(
            type,
            [
                skills[0]['hpEnemy'],
                skills[0]['enEnemy'],
                skills[0]['hpUser'],
                skills[0]['enUser']
            ]
        );
    });
    
    getDiv(`sk${3}`).addEventListener("mouseover", function () {
        showDesc(skills[0]['description']);
    });
    for (let i = 1; i < 4; i++) {
        var j = i - 1;
        getDiv(`sk${j}`).style = `background-image: url("../../resources/media/char/torchbearers/${torchbearer['name']}/skills/${skills[i]['filename']}.png");`;
        var type = skills[i]['hpEnemy'] == 0 && skills[i]['enEnemy'] == 0 ? 'heal':'attack';
        getDiv(`sk${j}`).addEventListener("mouseover", function () {
            showDesc(skills[i]['description']);
        });

        getDiv(`sk${j}`).addEventListener("click", function () {
            playSkill(
                type,
                [
                    skills[i]['hpEnemy'],
                    skills[i]['enEnemy'],
                    skills[i]['hpUser'],
                    skills[i]['enUser']
                ]
            );
        });
    }
    //chars
    getDiv('user-char').style = `background-image: url("${userLocation}/base.png");`;
    getDiv('monster-char').style = `background-image: url("${enemyLocation}/base.png");`;
    
    setTimeout(() => {
        alertMessage("Collect all the treasure");    
    },1000)
    //resetChar();
}
/*
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
 */
//console.log(localStorage.getItem("IsLogged"));
window.onload = startGame;    

