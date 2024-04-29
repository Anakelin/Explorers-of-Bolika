var map = document.getElementById("map");
var size = 10;

var startPos = [0,0];
var move = 5;
function createMap() {
    setMainBackground();
    var style = "grid-template-columns:";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            addCell(size, i, j,generatedMap[i][j]);
        }
        style += "auto ";
    }
    map.setAttribute("style",style);
    var user = getDiv(startPos[0]+"-"+startPos[1]);
    showMove(user.id);
    user.classList.add(userClass);    
}

function removeClass(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.classList.remove(userClass);
    });
}

function showMove(id) {
    var pos = id.split("-").map(Number);
    var endCell = [pos[0]+move,pos[1]+move];
    //clean board
    const elements = document.querySelectorAll(`.${moveClass}`);
    elements.forEach(element => {
        element.classList.remove(moveClass);
    });

    const row = pos[0];
    const col = pos[1];
    buildMove(row,col);
}

function isEnd() {
    const elements = document.querySelectorAll(`.${treasureClass}`);
    if(elements.length == 0) {
        return true;
    }
    return false;
}

function addCell(size, i ,j,type) {
    var div = document.createElement("div");
    div.classList = "cell";
    var border = 2;
    var cellSize = Math.floor(map.offsetHeight / size)-border;
    div.setAttribute("style","width:"+cellSize+"px;height:"+cellSize+"px");
    div.id = i+"-"+j;
    
    div.addEventListener("mouseover", function() {
        if(!div.classList.contains(userClass) && !div.classList.contains(wallClass)) {
            div.classList.add(highlightClass);    
        }
    })
    div.addEventListener("mouseout", function() {
        div.classList.remove(highlightClass);
    })

    div.addEventListener("click", function() {
        if(isClassPresent(div.id, moveClass)) {
            //Remove previous user position
            removeClass(userClass);
            
            //Remove old style
            div.classList.remove(highlightClass);
            //Update userposition
            div.classList.add(userClass);

            //Create new movement from new cell
            showMove(div.id);
            

            //Check combat
            if(isClassPresent(div.id,hallClass)) {
                setHallBackground();
                if(isBattle()) {
                    //startBattleFlip();
                }
                
            } else if (isClassPresent(div.id,spawnClass)) {
                setSpawnBackground();
            } else if(isClassPresent(div.id,enemClass)){
                setMainBackground();
                startBattleFlip();
                div.classList.remove(enemClass);
                div.classList.add(roomClass);
            } else if(isClassPresent(div.id,treasureClass)){
                div.classList.remove(treasureClass);
                div.classList.add(roomClass);
                //check if game as ended
                if(isEnd()) {
                    console.log("exit");
                    //save data to account
                    //pageChange("./user_page.html");
                }
            }
            
        }
        
    })
    
    if(type === m.Room) {
        div.classList.add(roomClass);
    } else if(type === m.Wall) {
        div.classList.add(wallClass);
    } else if(type === m.Hall) {
        div.classList.add(hallClass);
    } else if(type === m.Spawn){
        startPos = [i,j];
        div.classList.add(spawnClass);
    } else if(type === m.Fire) {
        div.classList.add(bonfireClass);
    } else if(type === m.Loot) {
        div.classList.add(treasureClass);
    } else if(type === m.Enem) {
        div.classList.add(enemClass);
    }
    
    map.appendChild(div);
}