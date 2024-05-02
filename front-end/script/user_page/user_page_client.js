let backgrounds = ["Grave","Ruins","Woods","Swamp","Fire"];

const diffEasy = 0.75;
const diffNormal = 1.0;
const diffHard = 1.5;

const backId = "background";
const locId = "loc-name";



const nameInfo = localStorage.getItem('username');
const emailInfo = localStorage.getItem('useremail');
const currencyInfo = localStorage.getItem('usercurrency');
const winInfo = localStorage.getItem('userwin');
const lossInfo = localStorage.getItem('userloss');

getDiv('user-info-name').innerHTML = nameInfo;
getDiv('user-info-email').innerHTML = emailInfo;
getDiv('game-info-currency').innerHTML = currencyInfo;
getDiv('game-info-win').innerHTML = winInfo;
getDiv('game-info-loss').innerHTML = lossInfo;

function startGame() {
    pageChange("./game_page.html");
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

function difForw() {
    let difId = "dif-name";
    let dif= getDiv(difId).innerHTML;
    switch(dif) {
        case "Normal":
            getDiv(difId).innerHTML = "Hard";
            localStorage.setItem('diff', diffHard);
            break;
        case "Easy":
            getDiv(difId).innerHTML = "Normal";
            localStorage.setItem('diff', diffHard);
        break;
        case "Hard":
            getDiv(difId).innerHTML = "Easy";
            localStorage.setItem('diff', diffEasy);
            break;
    }
    //do something
}

function difBack() {
    let difId = "dif-name";
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