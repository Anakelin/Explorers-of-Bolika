var combatViewClass = "combat-view";
var background = getDiv(combatViewClass);
var backgroundLocation = "./resources/game_page/back/swamp";

function setMainBackground() {
    let url = 'url('+backgroundLocation+'_main.png)';
        background.style.backgroundImage = url;    
}

function setHallBackground() {
    let url = 'url('+backgroundLocation+'_hall.png)';
    background.style.backgroundImage = url;    
}

function setSpawnBackground() {
    let url ='url('+backgroundLocation+'_spawn.png)';    
        background.style.backgroundImage = url;    
}