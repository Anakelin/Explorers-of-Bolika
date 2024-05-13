function isWin() {
    if (getClass(treasureClass) == undefined) {
        return true
    }
    return false;
}

function winGame() {
    //  pop-up
    //  window.alert("You win!");
    alertMessage("You Win !");
    //save data
    localStorage.setItem('isLoggedIn', true);
    setTimeout(() => {
        pageChange(userUrl);
    }, 1200);
}