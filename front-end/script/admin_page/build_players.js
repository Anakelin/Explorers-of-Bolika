/*
<div class="player">
<div class="info-box">
<div class="mini-title">1°</div>
<div id="name">Anakalin</div>
</div>

<div class="info-box">
<div class="mini-title">Currency:</div>
<div id="currency">0</div>
</div>
<div class="info-box">
<div class="mini-title">Wins:</div>
<div id="win">0</div>
</div>
<div class="info-box">
<div class="mini-title">Losses:</div>
<div id="loss">0</div>
</div>
</div>
 */

const defaultValue = 0;
const defaultName = "Martin";
var playerList = document.getElementById("top-players");

socket.on("updateUsersData", (data) => {
    var players = data[0];
    var playerTot = data[1][0]['totalPlayers'];
    for (let i = 0; i < players.length; i++) {
        playerList.append(buildPlayer(i, players[i])); 
    }
    //Get total players
    getDiv('total-player-value').innerHTML = playerTot;
    getDiv('currency-avg').innerHTML = Math.round(data[2][0]['currency']);
    getDiv('win-avg').innerHTML = Math.round(data[2][0]['win']);
    getDiv('loss-avg').innerHTML = Math.round(data[2][0]['loss']);
    getDiv('bought-avg').innerHTML = Math.round(data[2][0]['torchbearers']);
})

function buildList() {
    
    for (let i = 0; i < 10; i++) {
        playerList.append(buildPlayer(i));
    }
}

function buildPlayer(position, data) {
    var player = document.createElement("div");
    player.classList.add("player");
    player.appendChild(
        buildInfoBox(
            `${position + 1}°`,
            `name-${position}`,
            data['username']
        )
    );
    player.appendChild(
        buildInfoBox(
            "Currency:",
            `currency-${position}`,
            data['currency']
        )
    );
    player.appendChild(
        buildInfoBox(
            "Wins:",
            `win-${position}`,
            data['win']
        )
    );
    player.appendChild(
        buildInfoBox(
            "Losses:",
            `loss-${position}`,
            data['loss']
        )
    );
    return player;
}

function buildInfoBox (titleText, IDvalue, data) {
    var box = document.createElement("div");
    box.classList.add("info-box");
    
    var title = document.createElement("div");
    title.classList.add("mini-title");
    title.innerHTML = titleText;
    
    var value = document.createElement("div");
    value.classList.add(`${IDvalue}`);
    value.innerHTML = data;
    box.appendChild(title);
    box.appendChild(value);
    return box;
}


socket.emit('requestUsersData');
//window.onload = buildList;