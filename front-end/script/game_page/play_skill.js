const DEATHTIME = 350;
const RESETTIME = 300;
function playSkill(type,values) {
    //set value for monster
    if (type = 'attack') {
        //    
    }
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
    } else {
        alertMessage("Not enough energy !");
    }
    
}