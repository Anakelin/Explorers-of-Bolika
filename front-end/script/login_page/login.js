const formId = 'form-log-in';
let formInfo = document.getElementById(formId);
function tryLogin() {
    
    data = {
        'username': formInfo.elements[0].value,
        'password': formInfo.elements[1].value,
    }
    
    let error="Please insert ";
    if( data['username'].length == 0 ) {
        error += "the username"
    }
    if(data['password'].length == 0) {
        error += error.length < 15 ? "the password": " and the password";
    }   
    error += ".";
    
    if(error.length < 16) {
        socket.emit('checkUser',data);
    } else{
        alertMessage(error);
    }
    
}

socket.on('userLogin-success', function (data) {
    localStorage.setItem('user', JSON.stringify(data[0]));
    localStorage.setItem('chars', JSON.stringify(data[1]));
    localStorage.setItem('isLoggedIn', true);
    pageChange(userUrl);
});

socket.on('userLogin-failed', function () {
    window.alert("There is no user with this username and password.");
});