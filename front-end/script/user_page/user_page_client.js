let backgrounds = ["Grave","Ruins","Woods","Swamp","Fire"];
const backId = "background";
const locId = "loc-name";
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
            break;
        case "Easy":
            getDiv(difId).innerHTML = "Normal";
        break;
        case "Hard":
            getDiv(difId).innerHTML = "Easy";
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
            break;
        case "Easy":
            getDiv(difId).innerHTML = "Hard";
        break;
        case "Hard":
            getDiv(difId).innerHTML = "Normal";
            break;
    }
    //do something
}