const userClass = "user-cell";
const moveClass = "move-cell";
const highlightClass = "highlight-cell";
const enemClass = "enem";
const spawnClass = "spawn";
const roomClass = "room";
const wallClass = "wall";
const hallClass = "hall";
const bonfireClass = "bonfire";
const treasureClass = "treasure";

function getDiv(id) {
    return document.getElementById(id);
}

function isClassPresent(id, className) {
    var div = getDiv(id);
    return div.classList.contains(className);
}