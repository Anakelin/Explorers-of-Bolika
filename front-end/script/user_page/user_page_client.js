//Page requires account to access

if (localStorage.getItem('isLoggedIn') === null) {
    pageChange(loginUrl);
} else {
    localStorage.removeItem('isLoggedIn');
}

let backgrounds = ["Grave", "Ruins", "Woods", "Bog", "Fire"];
let difId = "diff-name";

const diffEasy = 0.75;
const diffNormal = 1.0;
const diffHard = 1.5;

const backId = "background";
const locId = "loc-name";

const accountData = JSON.parse(localStorage.getItem('user'));
const charsData = JSON.parse(localStorage.getItem('chars'));
let maxCharId = charsData.length - 1;
let charId = 0;
const tempchar = charsData[charId];

/**
 for (let i = 0; i < maxId; i++) {
        for (let j = 1; j < skills.length; j++) {
            preload(
                `./resources/media/char/torchbearers/${charsData[i]['name']}/skills/${skills[j]['filename']}.png`
            );
        }
    }
    preload(
        `./resources/media/char/torchbearers/Shared/skills/${skills[j]['filename']}.png`
    );
 */


// set data from database
getDiv('account-info-name').innerHTML = accountData['username'];
getDiv('account-info-email').innerHTML = accountData['email'];
getDiv('account-info-currency').innerHTML = accountData['currency'];
getDiv('account-info-win').innerHTML = accountData['win'];
getDiv('account-info-loss').innerHTML = accountData['loss'];

changeChar();

// Init explore info
locForw();
locBack();
getDiv(difId).innerHTML = "Normal";

// preload images 
var images = [];
/*
for (let i = 0; i < maxId; i++) {
    images[i] = new Image();
    preload(
        images[i].src = `./resources/media/char/torchbearers/${charsData[i]['name']}/base.png`
    );
}

preload(
    images[maxId].src = `./resources/media/back/forest_main.png`,
    images[maxId + 1].src = `./resources/media/back/grave_main.png`,
    images[maxId + 2].src = `./resources/media/back/pyro_main.png`,
    images[maxId + 3].src = `./resources/media/back/ruin_main.png`,
    images[maxId + 4].src = `./resources/media/back/swamp_main.png`,
);
*/
function startGame() {
    localStorage.setItem('isGameStarted', true);
    localStorage.setItem('torchbearer', JSON.stringify(charsData[charId]));
    pageChange("./game_page.html");
}

function charForw() {
    charId = charId < maxCharId ? charId + 1 : 0;
    changeChar();
}

function charBack() {
    charId = charId > 0 ? charId -1: maxCharId;
    changeChar();
}

function changeChar() {
    let charLocation = `background-image: url("../../resources/media/char/torchbearers/${charsData[charId]['name']}/base.png");`;
    getDiv('char-info-img').style = charLocation;
    getDiv('char-info-name').innerHTML = "The " + charsData[charId]['name'];
    getDiv('char-info-hp').innerHTML = charsData[charId]['maxHP'];
    getDiv('char-info-en').innerHTML = charsData[charId]['maxEN'];
    getDiv('char-info-mov').innerHTML = charsData[charId]['move'];
    getDiv('char-info-cost').innerHTML = charsData[charId]['cost'];
    getDiv('char-info-desc').innerHTML = charsData[charId]['desc'];
    getDiv('char-info-img').style = charLocation;
    socket.emit('requestSkills',charId+1);
}

socket.on('receiveSkills', (skillsData) => {
    getDiv(`icon-${3}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skillsData[0]['filename']}.png");`;
    getDiv(`hp-value-${3}`).innerHTML = skillsData[0]['hpEnemy'];
    getDiv(`en-value-${3}`).innerHTML = skillsData[0]['enUser'];
    getDiv(`desc-${3}`).innerHTML = skillsData[0]['description'];
    for (let i = 1; i < 4; i++) {
        var j = i - 1;
        getDiv(`icon-${j}`).style = `background-image: url("../../resources/media/char/torchbearers/${charsData[charId]['name']}/skills/${skillsData[i]['filename']}.png");`;
        getDiv(`hp-value-${j}`).innerHTML = skillsData[i]['hpEnemy'];
        getDiv(`en-value-${j}`).innerHTML = skillsData[i]['enUser'];
        getDiv(`desc-${j}`).innerHTML = skillsData[i]['description'];
    }
    localStorage.setItem('skills', JSON.stringify(skillsData));
})

function locForw() {    
    let oldBack = "";
    backgrounds.forEach(element => {
        if(getDiv(backId).classList.contains(element)) {
            oldBack = element;
        }
    });
    let index = backgrounds.indexOf(oldBack)+1;
    
    let newBack = index < backgrounds.length ? index : 0;
    changeLoc(newBack,oldBack);
}

function locBack() {    
    
    let oldBack = "";
    backgrounds.forEach(element => {
        if(getDiv(backId).classList.contains(element)) {
            oldBack = element;
        }
    });
    let index = backgrounds.indexOf(oldBack)-1;
    
    let newBack = index > -1 ? index : backgrounds.length-1;
    changeLoc(newBack,oldBack);
}

function changeLoc(newBack,oldBack) {
    getDiv(backId).classList.remove(`${oldBack}`);
    getDiv(backId).classList.add(`${backgrounds[newBack]}`);
    localStorage.setItem('location', backgrounds[newBack]);
    getDiv(locId).innerHTML = "The " + backgrounds[newBack];
}

function diffForw() {
    
    let dif= getDiv(difId).innerHTML;
    switch(dif) {
        case "Normal":
            getDiv(difId).innerHTML = "Hard";
            localStorage.setItem('diff', diffHard);
            break;
        case "Easy":
            getDiv(difId).innerHTML = "Normal";
            localStorage.setItem('diff', diffNormal);
        break;
        case "Hard":
            getDiv(difId).innerHTML = "Easy";
            localStorage.setItem('diff', diffEasy);
            break;
    }
    //do something
}

function diffBack() {
    let difId = "diff-name";
    let dif= getDiv(difId).innerHTML;
    switch(dif) {
        case "Normal":
            getDiv(difId).innerHTML = "Easy";
            localStorage.setItem('diff', diffEasy);
            break;
        case "Easy":
            getDiv(difId).innerHTML = "Hard";
            localStorage.setItem('diff', diffHard);
        break;
        case "Hard":
            getDiv(difId).innerHTML = "Normal";
            localStorage.setItem('diff', diffNormal);
            break;
    }
    //do something
}