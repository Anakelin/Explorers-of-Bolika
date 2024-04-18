const formId = 'form-sign-in';
let formInfo = document.getElementById(formId);
let out = [];
function trySignin() {
    
    out[0] = formInfo.elements[0].value;
    out[1] = formInfo.elements[1].value;
    out[2] = formInfo.elements[2].value;
    
    let error="Please insert ";
    if( out[0].length == 0 ) {
        error += "the username"
    }
    if(out[1].length == 0) {
        error += error.length < 15 ? "the email": " and the email";
    }
    if(out[2].length == 0) {
        error += error.length < 15 ? "the password": " and the password";
    }   
    error += ".";
    
    if(error.length < 16) {
        socket.emit('checkUser',out);
    } else{
        alertMessage(error);
    }
    
}

socket.on('userSignin-success', function () {
    pageChange('./game_page.html');
})

socket.on('userSignin-failed', function () {
    window.alert("There is no user with this username and password.");
})