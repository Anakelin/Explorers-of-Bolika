const formId = 'form-log-in';
let formInfo = document.getElementById(formId);
let out = [];
function tryLogin() {
    
    out[0] = formInfo.elements[0].value;
    out[1] = formInfo.elements[1].value;
    
    let error="Please insert ";
    if( out[0].length == 0 ) {
        error += "the username"
    }
    if(out[1].length == 0) {
        error += error.length < 15 ? "the password": " and the password";
    }   
    error += ".";
    
    if(error.length < 16) {
        socket.emit('checkUser',out);
    } else{
        alertMessage(error);
    }
    
}

socket.on('userLogin-success', function (user) {
    localStorage.setItem('username', user[0].username);
    localStorage.setItem('useremail', user[0].email);
    localStorage.setItem('usercurrency', user[0].currency);
    localStorage.setItem('userwin', user[0].win);
    localStorage.setItem('userloss', user[0].loss);
    pageChange(userUrl);
})

socket.on('userLogin-failed', function () {
    window.alert("There is no user with this username and password.");
})