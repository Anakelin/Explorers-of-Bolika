//Page requires account to access
const skillType = {
    attack: 'attack',
    heal: 'heal'
}
if (localStorage.getItem('isGameStarted') === null) {
    pageChange(loginUrl);
} else {
    localStorage.removeItem('isGameStarted');
}
const dungeon = localStorage.getItem('location');
const skills = JSON.parse(localStorage.getItem('skills'));
const skillsBonfire = JSON.parse(localStorage.getItem('shared'));
const diff = localStorage.getItem('diff');

var userLocation = `./resources/media/char/torchbearers/${torchbearer['name']}/`;
//var enemyLocation = `./resources/media/char/enemy/${location}//`;    
var enemyLocation = `./resources/media/char/enemy/Woods/Duel_Dancer/`;    

function showDesc(text) {
    getDiv('sk-desc').innerHTML = text;
}

function buildSkillsNormal() {
    getDiv(`sk${3}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skills[3]['filename']}.png");`;
    getDiv(`sk${3}`).addEventListener("click", function () {
        playSkill(
            skillType.heal,
            [
                skills[3]['hpEnemy'],
                skills[3]['enEnemy'],
                skills[3]['hpUser'],
                skills[3]['enUser']
            ],
            userLocation,
            enemyLocation
        );
    });

    getDiv(`sk${3}`).addEventListener("mouseover", function () {
        showDesc(skills[0]['description']);
    });
    for (let i = 0; i < 3; i++) {
        getDiv(`sk${i}`).style = `background-image: url("../../resources/media/char/torchbearers/${torchbearer['name']}/skills/${skills[i]['filename']}.png");`;
        getDiv(`sk${i}`).addEventListener("mouseover", function () {
            showDesc(skills[i]['description']);
        });
        getDiv(`sk${i}`).addEventListener("click", function () {
            let type = skills[i]['filename'].includes('heal') ? skillType.heal : skillType.attack;
            console.log(skills[i]['filename'], skills[i]['filename'].includes('heal'));
            playSkill(
                type,
                [
                    skills[i]['hpEnemy'],
                    skills[i]['enEnemy'],
                    skills[i]['hpUser'],
                    skills[i]['enUser']
                ],
                userLocation,
                enemyLocation
            );
        });
    }
}

function buildSkillsBonfire() {
    getDiv(`sk${1}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skillsBonfire[0]['filename']}.png");`;
    getDiv(`sk${1}`).addEventListener("click", function () {
        //playSkillBonfire
    });

    getDiv(`sk${1}`).addEventListener("mouseover", function () {
        showDesc(skillsBonfire[0]['description']);
    });

    getDiv(`sk${2}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skillsBonfire[1]['filename']}.png");`;
    getDiv(`sk${2}`).addEventListener("click", function () {
        //playSkillBonfire
    });

    getDiv(`sk${2}`).addEventListener("mouseover", function () {
        showDesc(skillsBonfire[1]['description']);
    });
}

socket.on('gameStart', () => {
    createMap();
    //skills
    buildSkillsNormal();
    //buildSkillsBonfire();
    //chars
    const userSpriteId = 'user-char';
    const monsterSpriteId = 'monster-char';
    getDiv(userSpriteId).style = `background-image: url("${userLocation}/base.png");`;
    getDiv(monsterSpriteId).style = `background-image: url("${enemyLocation}/base.png");`;

    setTimeout(() => {
        alertMessage("Collect all the treasure");
    }, 1000)
});

