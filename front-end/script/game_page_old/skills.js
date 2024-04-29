//cambia da singoli png in sprite orizzontali
var user = getDiv("user-char");
var enemy = getDiv("enemy-char");
var userLocation = "./resources/char/default/";
var enemyLocation = "./resources/char/rotten/";
var animationDuration = 1000;

function resetChar() {
    user.style.backgroundImage = 'url('+userLocation+'base.png)';
    enemy.style.backgroundImage = 'url('+enemyLocation+'base.png)';
}

function setUserToDefend() {
    user.style.backgroundImage = 'url('+userLocation+'defend.png)';
}

function setEnemyToDefend() {
    enemy.style.backgroundImage = 'url('+enemyLocation+'defend.png)';
}

function default0 (user){
    user.style.backgroundImage = 'url('+userLocation+'0.png)';    
    user.animate({
        transform: [
            'translate3d(0, 0, 0)',
            'translate3d(100%, 0, 0)',
            'translate3d(150%, 5%, 0)',
            'translate3d(190%, 0%, 0)',
            'translate3d(300%, -5%, 0)',
            'translate3d(0, 0, 0)'
        ],
        easing: ['ease-in', 'ease-out'],
        }, animationDuration);
    setEnemyToDefend();
}

function default1 (user){
    user.style.backgroundImage = 'url('+userLocation+'1.png)';
    setEnemyToDefend();
    user.animate({
        transform: [
            'translate3d(0, 0, 0)',
            'translate3d(100%, 0, 0)',
            'translate3d(150%, 10%, 0)',
            'scaleY(-1)',
            'translate3d(300%, 0, 0)',
            'translate3d(300%, 0, 0)',
            'translate3d(0, 0, 0)'
        ],
        easing: ['ease-in', 'ease-out'],
    }, animationDuration);    
}

function default2 (user){
    user.style.backgroundImage = 'url('+userLocation+'2.png)';
        setEnemyToDefend();
        user.animate({
            transform: [
                'translate3d(0, 0, 0)',
                'translate3d(-50%, 0, 0)',
                'translate3d(100%, 0, 0)',
                'translate3d(150%, -10%, 0)',
                'translate3d(300%, 0, 0)',
                'translate3d(0, 0, 0)'],
            easing: ['ease-in', 'ease-out'],
        }, animationDuration);
}

function default3 (user){
    user.style.backgroundImage = 'url('+userLocation+'3.png)'; 
}

function skill (id){
    switch (id) {
        case 0:
            default0(user);
            changeEnemyHp(-15);
            break;
        case 1:
            default1(user);
            changeUserEn(15);
            changeUserHp(5);
            break;
        case 2:
            default2(user);
            changeUserEn(-20);
            changeEnemyHp(-20);
            break;
        case 3:
            default3(user);
            changeUserEn(-25);
            changeUserHp(25);
            break;    
        default:
            break;
    }
    setTimeout(function(){
        resetChar();    
      },animationDuration)
}