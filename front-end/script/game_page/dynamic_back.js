var battlefieldId = "battlefield-box";
var background = getDiv(battlefieldId);
var loc = localStorage.getItem('location');
var backgroundLocation = `./resources/media/back/${loc.toLowerCase()}`;

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