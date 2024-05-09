let backgrounds = ["Grave","Ruins","Woods","Bog","Fire"];
let difId = "diff-name";

const diffEasy = 0.75;
const diffNormal = 1.0;
const diffHard = 1.5;

const backId = "background";
const locId = "loc-name";

const accountData = JSON.parse(localStorage.getItem('user'));
const charsData = JSON.parse(localStorage.getItem('chars'));
let maxId = charsData.length;
let currentId = 5;
const tempchar = charsData[currentId];
localStorage.setItem('torchbearer', JSON.stringify(tempchar));
let charLocation = `background-image: url("../../resources/media/char/torchbearers/${tempchar['name']}/attack.png");`;

// set data from database
getDiv('account-info-name').innerHTML = accountData['username'];
getDiv('account-info-email').innerHTML = accountData['email'];
getDiv('account-info-currency').innerHTML = accountData['currency'];
getDiv('account-info-win').innerHTML = accountData['win'];
getDiv('account-info-loss').innerHTML = accountData['loss'];

getDiv('char-info-name').innerHTML = "The "+tempchar['name'];
getDiv('char-info-hp').innerHTML = tempchar['maxHP'];
getDiv('char-info-en').innerHTML = tempchar['maxEN'];
getDiv('char-info-mov').innerHTML = tempchar['move'];
getDiv('char-info-cost').innerHTML = tempchar['cost'];
getDiv('char-info-desc').innerHTML = tempchar['desc'];
getDiv('char-info-img').style = charLocation;

// Init explore info
locForw();
locBack();
getDiv(difId).innerHTML = "Normal";

function startGame() {
    pageChange("./game_page.html");
}

function charForw() {
    currentId = currentId + 1 <= maxId ? currentId + 1 : 1;
    console.log(currentId);
}

function charBack() {
    currentId = currentId - 1 > 1 ? currentId - 1 : maxId;
    console.log(currentId);
}

function locForw() {    
    let oldBack = "";
    backgrounds.forEach(element => {
        if(getDiv(backId).classList.contains(element)) {
            oldBack = element;
        }
    });
    let index = backgrounds.indexOf(oldBack)+1;
    console.log(index);
    
    let newBack = index < backgrounds.length? index:0;
    getDiv(backId).classList.remove(`${oldBack}`);
    getDiv(backId).classList.add(`${backgrounds[newBack]}`);       
    getDiv(locId).innerHTML = "The "+backgrounds[newBack];
    //change location to explore
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
    console.log(newBack);
    getDiv(backId).classList.remove(`${oldBack}`);
    getDiv(backId).classList.add(`${backgrounds[newBack]}`);       
    getDiv(locId).innerHTML = "The "+backgrounds[newBack];
    //change location to explore
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