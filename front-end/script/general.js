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

function removeClass(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.classList.remove(userClass);
    });
}

function getClass(className) {
    const elements = document.querySelectorAll(`.${className}`);
    if(elements.length != 0) {
        return elements;
    } else {
        return undefined;
    }
}