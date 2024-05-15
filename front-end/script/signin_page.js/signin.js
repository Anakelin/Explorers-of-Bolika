const formId = 'form-sign-in';
let formInfo = document.getElementById(formId);
const textLength = 17;
const emailLength = 31;
function trySignin() {
    
    data = {
        'username': formInfo.elements[0].value,
        'email': formInfo.elements[1].value,
        'password': formInfo.elements[2].value
    }
    let error= "";
    if( data['username'].length == 0 ) {
        error += `no username`;
    } else {
        error += `username too long(max${textLength - 1})`;
    }
    
    if (data['password'].length == 0) {
        error += error.length == 0 ? `` : `, `;
        error += "no password";
    } else if (data['password'].length > textLength){
        error += error.length == 0 ? `` : `, `;
        error += `password too long(max${textLength - 1})`;
    }

    if (data['email'].length == 0) {
        error += error.length == 0 ? `` : `, `;
        error += "no password";
    } else if (data['email'].length > emailLength) {
        error += error.length == 0 ? `` : `, `;
        error += `email too long(max${emailLength - 1})`;
    }
    
    error += ".";
    
    if (error.length < 16) {
        socket.emit('insertAccount', data);
        localStorage.setItem('isLoggedIn', true);
        pageChange(userUrl);
    } else{
        alertMessage(error);
    }   
}