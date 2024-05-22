//clear all data
localStorage.clear();

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
    } else if (data['username'].length > textLength){
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
    
    if (error.length == 1) {
        socket.emit('checkAccountExist', data);
    } else{
        alertMessage(error);
    }
    
    socket.on('userCreated', () => {
        socket.emit('checkUser',data); 
    });

    socket.on('userAccess-success', (data) => {
        localStorage.setItem('user', JSON.stringify(data[0]));
        localStorage.setItem('chars', JSON.stringify(data[1]));
        localStorage.setItem('isLoggedIn', true);
        pageChange(userUrl);
    })

    socket.on('userAccess-failed', () => {
        alertMessage("There is already a user with this username and/or email.");
    })
}