var battlefieldId = "battlefield-box";
var background = getDiv(battlefieldId);
var backgroundLocation = "./resources/media/back/grave";

function setMainBackground() {
    let url = 'url(' + backgroundLocation + '_main.png)';
    background.style.backgroundImage = url;
}

function setHallBackground() {
    let url = 'url(' + backgroundLocation + '_hall.png)';
    background.style.backgroundImage = url;
}

function setSpawnBackground() {
    let url = 'url(' + backgroundLocation + '_spawn.png)';
    background.style.backgroundImage = url;
}