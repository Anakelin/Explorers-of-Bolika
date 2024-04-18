const formId = 'form-log-in';
let formInfo = document.getElementById(formId);
let out = [];
function tryLogin() {
    
    //out[0] = formInfo.elements[0].value;
    //out[1] = formInfo.elements[1].value;
    out[0] = "HackerPizzaiolo";
    out[1] = 1234;
    
    socket.emit('checkUser',out);
}

socket.on('userLogin-success', function () {
    console.log("log in");
    pageChange('./game_page.html');
})

socket.on('userLogin-failed', function () {
    console.log("not logged in");
})