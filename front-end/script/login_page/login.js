//clear all data
localStorage.clear();

const formId = 'form-log-in';
let formInfo = document.getElementById(formId);
const textLength = 17;
const emailLength = 31;

function tryLogin() {
    
    data = {
        'username': formInfo.elements[0].value,
        'password': formInfo.elements[1].value,
    }
    
    let error="";
    if (data['username'].length == 0) {
        error += `no username`;
    } else if (data['username'].length > textLength) {
        error += `username too long(max${textLength - 1})`;
    }

    if (data['password'].length == 0) {
        error += error.length == 0 ? `` : `, `;
        error += "no password";
    } else if (data['password'].length > textLength) {
        error += error.length == 0 ? `` : `, `;
        error += `password too long(max${textLength - 1})`;
    }
    error += ".";
    
    if(error.length == 1) {
        socket.emit('checkUser',data);
    } else{
        alertMessage(error);
    }
    
}

socket.on('userAccess-success', function (data) {
    localStorage.setItem('user', JSON.stringify(data[0]));
    localStorage.setItem('chars', JSON.stringify(data[1]));
    localStorage.setItem('isLoggedIn', true);
    pageChange(userUrl);
});

socket.on('userAccess-failed', () => {
    alertMessage("There is no user with this username and password.");
});