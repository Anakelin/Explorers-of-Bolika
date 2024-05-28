function isWin() {
    if (getClass(treasureClass) == undefined) {
        return true
    }
    return false;
}

function winGame() {
    //  pop-up
    //  window.alert("You win!");
    
    //save data
    var gainedCurrency = parseInt(localStorage.getItem('explore-meta-money'));
    localStorage.setItem('isLoggedIn', true);
    user['win'] = user['win'] != DATALIMIT ? user['win'] + 1 : user['win'];
    user['currency'] = user['currency'] + gainedCurrency < DATALIMIT ? user['currency'] + gainedCurrency : DATALIMIT;

    alertMessage("You succesfully looted the location!");
    setTimeout(() => {
        socket.emit("updateAccountEndBattle", user);
    },1000)
}

socket.on('updateAccountEndBattleSuccess', () => {
    localStorage.setItem('user', JSON.stringify(user));        
    pageChange(userUrl);
})