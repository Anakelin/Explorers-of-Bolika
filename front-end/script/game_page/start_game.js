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
const userSpriteId = 'user-char';
const monsterSpriteId = 'monster-char';

var userLocation = `./resources/media/char/torchbearers/${torchbearer['name']}/`;

localStorage.setItem('hasActed', false);

socket.on('gameStart', () => {
    createMap();
    //skills
    buildSkillsNormal();
    //chars
    getDiv(userSpriteId).style = `background-image: url("${userLocation}/base.png");`;
    
    // Initialize meta data
    var money = Math.floor(
        parseInt(localStorage.getItem('explore-meta-money')) / 2
    );
    updateMetaData(money, 0);
    
    setTimeout(() => {
        alertMessage("Collect all the treasure");
    }, 1000)
});

