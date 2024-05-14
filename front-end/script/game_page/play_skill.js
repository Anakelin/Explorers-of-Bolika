const DEATHTIME = 350;
const RESETTIME = 300;
const ANITIME = 550;

const userAttack = [
    'translate3d(0, 0, 0)',
    'translate3d(100%, 0, 0)',
    'translate3d(150%, 0, 0)',
    'translate3d(300%, 0%, 0)',
    'translate3d(300%, -5%, 0)',
    'translate3d(0, 0, 0)'
];

const userDefend = [
    'translate3d(-5%, 0, 0)',
    'translate3d(5%, 0, 0)'
];

const enemyAttack = [
    'translate3d(0, 0, 0) scaleX(-1)',
    'translate3d(-100%, 0, 0) scaleX(-1)',
    'translate3d(-150%, 0, 0) scaleX(-1)',
    'translate3d(-300%, 0%, 0) scaleX(-1)',
    'translate3d(-300%, -5%, 0) scaleX(-1)',
    'translate3d(0, 0, 0) scaleX(-1)'
];

const enemyDefend = [
    'translate3d(0%, 0, 0) scaleX(-1)',
    'translate3d(-15%, 0, 0) scaleX(-1)'
];

let skillPlayed = false;

function playSkill(type,values,skillUserLocation,targetLocation) {
    //set value for monster
    playBars(values);
    if (skillPlayed) {
        playAnimation(type, skillUserLocation, targetLocation);
    }
    
}

function playAnimation(type, skillUserLocation, targetLocation) {
    var skillUser = "";
    var direction = 1;
    var skillUserAnimation = [];
    var targetAnimation = [];
    if (skillUserLocation.includes('torchbearers')) {
        skillUser = 'user-char';
        skillTarget = 'monster-char';
        skillUserAnimation = userAttack;
        targetAnimation = enemyDefend;
    } else {
        skillUser = 'monster-char';
        skillTarget = 'user-char';
        skillUserAnimation = enemyAttack;
        targetAnimation = userDefend;
        direction = -1;
    }
    
    var user = getDiv(skillUser);
    var target = getDiv(skillTarget);
    if (type == skillType.attack) {
        
        user.style = `background-image: url("${skillUserLocation}/attack.png");`;
        user.animate({
            transform: skillUserAnimation,
            easing: ['ease-in', 'ease-out'],
        }, ANITIME);
        target.style = `background-image: url("${targetLocation}/defend.png");`;
        target.animate({
            transform: targetAnimation,
            easing: ['ease-in', 'ease-out'],
        }, ANITIME);
    } else {
        user.style = `background-image: url("${skillUserLocation}/rest.png");`;
    }

    setTimeout(() => {
        getDiv(skillUser).style = `background-image: url("${skillUserLocation}/base.png");`;
        getDiv(skillTarget).style = `background-image: url("${targetLocation}/base.png");`;
    }, ANITIME);
}

function playBars(values) {
    if (currentUserEn + values[3] >= 0) {
        playHp(values[0], chars.monster);
        playEn(values[1], chars.monster);

        //set value for torchbearer
        playHp(values[2], chars.player);
        playEn(values[3], chars.player);

        if (currentMonsterHp <= 0) {
            setTimeout(function () {
                endBattle(true);
                setTimeout(function () {
                    resetMonster();
                }, RESETTIME);
            }, DEATHTIME)


        } else if (currentUserHp <= 0) {
            setTimeout(function () {
                endBattle(false);
            }, DEATHTIME);
        }
        skillPlayed = true;
    } else {
        alertMessage("Not enough energy !");
        skillPlayed = false;
    }
}