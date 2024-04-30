const DEATHTIME = 550;
function playSkill(id, player) {
    // check id and hero and get hp and en
    var hp = -20;
    var en = -10;
    //healing self
    
    var target = hp > 0 ? chars.player: chars.monster;
    playHp(hp, target);    
    playEn(en, chars.player);
    
    //play animation depending on skill id
    if (true) {
        //playSmite();    
    }
    if (currentMonsterHp <= 0) {
        setTimeout(function () {
            resetMonster();
            endBattle(true);    
        }, DEATHTIME);
        
    } else if (currentUserHp <= 0) {
        setTimeout(function () {
            endBattle(false);
        }, DEATHTIME);
    }
}