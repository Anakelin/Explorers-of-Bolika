function playBarsMonster(values) {
    if (currentMonsterEn + values[3] >= 0) {
        playHp(values[0], chars.player);
        playEn(values[1], chars.player);

        playHp(values[2], chars.monster);
        playEn(values[3], chars.monster);
        
        skillPlayed = true;

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
        playEn(maxMonsterEn / 4, chars.monster);
    }
}