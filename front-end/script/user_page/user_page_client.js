//Page requires account to access

if (localStorage.getItem('isLoggedIn') === null) {
    pageChange(loginUrl);
} else {
    localStorage.removeItem('isLoggedIn');
}

let backgrounds = ["Grave", "Ruins", "Woods", "Bog", "Fire"];
localStorage.setItem('locationAll', JSON.stringify(backgrounds));
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
localStorage.setItem('diff', diffNormal);
var images = [];

function startGame() {
    localStorage.setItem('isGameStarted', true);
    localStorage.setItem('torchbearer', JSON.stringify(charsData[charId]));
    localStorage.setItem('explore-meta-money', accountData['currency']);
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
    getDiv('char-info-lv').innerHTML = "1";
    getDiv('char-info-hp').innerHTML = charsData[charId]['maxHP'];
    getDiv('char-info-en').innerHTML = charsData[charId]['maxEN'];
    getDiv('char-info-mov').innerHTML = charsData[charId]['move'];
    getDiv('char-info-cost').innerHTML = charsData[charId]['cost'];
    getDiv('char-info-desc').innerHTML = charsData[charId]['desc'];
    getDiv('char-info-img').style = charLocation;
    socket.emit('requestSkills',charId+1);
}

socket.on('receiveSkills', (skillsData) => {
    
    let skillsNormal = skillsData['skills'];
    
    let skillsShared = skillsData['shared'];
    let hpValue = Math.floor(charsData[charId]['maxHP'] / 4);
    let enValue = Math.floor(charsData[charId]['maxEN'] / 2);
    let quickRest = {  
        name: skillsShared[0]['name'],
        filename: skillsShared[0]['filename'],
        hpEnemy: 0,
        enEnemy: 0,
        hpUser: hpValue,
        enUser: enValue,
        description: skillsShared[0]['description']
    }
    getDiv(`icon-${3}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skillsShared[0]['filename']}.png");`;
    getDiv(`hp-value-${3}`).innerHTML = Math.abs(hpValue);
    getDiv(`en-value-${3}`).innerHTML = Math.abs(enValue);
    getDiv(`desc-${3}`).innerHTML = quickRest['description'];
    
    for (let i = 0; i < 3; i++) {
        getDiv(`icon-${i}`).style = `background-image: url("../../resources/media/char/torchbearers/${charsData[charId]['name']}/skills/${skillsNormal[i]['filename']}.png");`;
        getDiv(`hp-value-${i}`).innerHTML = skillsNormal[i]['hpEnemy'] != 0 ?
            Math.abs(skillsNormal[i]['hpEnemy']) :
            Math.abs(skillsNormal[i]['hpUser']);
        getDiv(`en-value-${i}`).innerHTML = Math.abs(skillsNormal[i]['enUser']);
        getDiv(`desc-${i}`).innerHTML = skillsNormal[i]['description'];
    }
    skillsNormal[3] = quickRest;
    localStorage.setItem('skills', JSON.stringify(skillsNormal));
    
    // Shift to remove quick rest
    skillsShared.shift();
    localStorage.setItem('shared', JSON.stringify(skillsShared));
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
}