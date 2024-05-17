function isWin() {
    if (getClass(treasureClass) == undefined) {
        return true
    }
    return false;
}

function winGame() {
    //  pop-up
    //  window.alert("You win!");
    alertMessage("You succesfully looted the location!");
    //save data
    localStorage.setItem('isLoggedIn', true);
    user['win'] = user['win'] != 999 ? user['win'] + 1 : user['win'];
    user['currency'] = user['loss'] + 10 < 999 ? user['currency'] + 10 : 999;
    socket.emit("updateAccountEndBattle", user);
}

socket.on('updateAccountEndBattleSuccess', () => {
    localStorage.setItem('user', JSON.stringify(user));        
    setTimeout(() => {
        pageChange(userUrl);
    }, 1200)
})