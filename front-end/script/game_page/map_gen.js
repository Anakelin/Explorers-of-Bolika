var map = document.getElementById("map");
var size = 10;

var startPos = [0, 0];
var move = torchbearer['move'];
function createMap() {
    setMainBackground();
    var style = "grid-template-columns:";
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            addCell(size, i, j, generatedMap[i][j]);
        }
        style += "auto ";
    }
    map.setAttribute("style", style);
    var user = getDiv(startPos[0] + "-" + startPos[1]);
    showMove(user.id);
    user.classList.add(userClass);
}

function removeClass(className) {
    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach(element => {
        element.classList.remove(className);
    });
}

function showMove(id) {
    var pos = id.split("-").map(Number);
    var endCell = [pos[0] + move, pos[1] + move];
    const row = pos[0];
    const col = pos[1];
    buildMove(row, col);
}

function addCell(size, i, j, type) {
    var div = document.createElement("div");
    div.classList.add("cell");
    var border = 2;
    var cellSize = Math.floor(map.offsetHeight / size) - border;
    div.setAttribute("style", "width:" + cellSize + "px;height:" + cellSize + "px");
    div.id = i + "-" + j;

    div.addEventListener("mouseover", function () {
        if (!div.classList.contains(userClass) && !div.classList.contains(wallClass)) {
            div.classList.add(highlightClass);
        }
    })
    div.addEventListener("mouseout", function () {
        div.classList.remove(highlightClass);
    })

    div.addEventListener("click", function () {
        if (isClassPresent(div.id, moveClass)) {
            //Remove previous user position
            removeClass(userClass);

            //Remove old style
            div.classList.remove(highlightClass);
            //Update userposition
            div.classList.add(userClass);

            //Create new movement from new cell
            showMove(div.id);


            //Check combat
            if (isClassPresent(div.id, hallClass)) {
                setHallBackground();
                if (isBattle()) {
                    alertMessage("You engaged an enemy !");
                    startBattle("Hall");
                }
            } else if (isClassPresent(div.id, roomClass)) {
                setMainBackground();
            } else if (isClassPresent(div.id, spawnClass)) {
                setSpawnBackground();
                if (isWin()) {
                    winGame();
                }
            } else if (isClassPresent(div.id, enemClass)) {
                setMainBackground();
                alertMessage("You engaged an enemy !");
                startBattle("Room");
                div.classList.remove(enemClass);
                div.classList.add(roomClass);
            } else if (isClassPresent(div.id, treasureClass)) {
                div.classList.remove(treasureClass);
                div.classList.add(roomClass);
                if (isWin()) {
                    alertMessage("Return to the Entrance");    
                } else {
                    alertMessage("You found a treasure !");
                }

                // set money
                var loot = 20;
                var currentLoot = parseInt(localStorage.getItem('explore-meta-money'));
                currentLoot += loot;
                updateMetaMoney(currentLoot);
                
            } else if (isClassPresent(div.id, bonfireClass)) {
                div.classList.remove(bonfireClass);
                div.classList.add(roomClass);
                startRest();
            }
        }

    })

    if (type === m.Room) {
        div.classList.add(roomClass);
    } else if (type === m.Wall) {
        div.classList.add(wallClass);
    } else if (type === m.Hall) {
        div.classList.add(hallClass);
    } else if (type === m.Spawn) {
        startPos = [i, j];
        div.classList.add(spawnClass);
    } else if (type === m.Fire) {
        div.classList.add(bonfireClass);
    } else if (type === m.Loot) {
        div.classList.add(treasureClass);
    } else if (type === m.Enem) {
        div.classList.add(enemClass);
    }

    map.appendChild(div);
}