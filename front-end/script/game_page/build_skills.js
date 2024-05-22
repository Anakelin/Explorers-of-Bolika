function showDesc(text) {
    getDiv('sk-desc').innerHTML = text;
}

function buildSkillsNormal() {
    //set icons
    getDiv(`sk${0}`).style = `background-image: url("../../resources/media/char/torchbearers/${torchbearer['name']}/skills/${skills[0]['filename']}.png");`;
    getDiv(`sk${1}`).style = `background-image: url("../../resources/media/char/torchbearers/${torchbearer['name']}/skills/${skills[1]['filename']}.png");`;
    getDiv(`sk${2}`).style = `background-image: url("../../resources/media/char/torchbearers/${torchbearer['name']}/skills/${skills[2]['filename']}.png");`;
    getDiv(`sk${3}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skills[3]['filename']}.png");`;

    //set skills
    getDiv(`sk${0}`).addEventListener("click", clickSkillCombat0);
    getDiv(`sk${1}`).addEventListener("click", clickSkillCombat1);
    getDiv(`sk${2}`).addEventListener("click", clickSkillCombat2);
    getDiv(`sk${3}`).addEventListener("click", clickSkillCombat3);

    //set desc
    getDiv(`sk${0}`).addEventListener("mouseover", mouseoverSkillBattle0);
    getDiv(`sk${1}`).addEventListener("mouseover", mouseoverSkillBattle1);
    getDiv(`sk${2}`).addEventListener("mouseover", mouseoverSkillBattle2);
    getDiv(`sk${3}`).addEventListener("mouseover", mouseoverSkillBattle3);
}

function buildSkillsBonfire() {
    getDiv(`sk${0}`).classList.add("unload");

    getDiv(`sk${1}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skillsBonfire[0]['filename']}.png");`;
    getDiv(`sk${1}`).addEventListener("click", playConversion);

    getDiv(`sk${1}`).addEventListener("mouseover", mouseoverSkillCamp0);

    getDiv(`sk${2}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skillsBonfire[1]['filename']}.png");`;
    getDiv(`sk${2}`).addEventListener("click", playHealRest);

    getDiv(`sk${2}`).addEventListener("mouseover", mouseoverSkillCamp1);

    getDiv(`sk${3}`).style = `background-image: url("../../resources/media/char/torchbearers/Shared/skills/${skillsBonfire[2]['filename']}.png");`;
    getDiv(`sk${3}`).addEventListener("click", endRest);

    getDiv(`sk${3}`).addEventListener("mouseover", mouseoverSkillCamp2);
}

//Battle Skills

function clickSkillCombat0() {
    var skillIndex = 0;
    let type = skills[skillIndex]['filename'].includes('heal') ? skillType.heal : skillType.attack;
    playSkill(
        type,
        [
            skills[skillIndex]['hpEnemy'],
            skills[skillIndex]['enEnemy'],
            skills[skillIndex]['hpUser'],
            skills[skillIndex]['enUser']
        ],
        userLocation,
        enemyLocation
    );
}

function clickSkillCombat1() {
    var skillIndex = 1;
    let type = skills[skillIndex]['filename'].includes('heal') ? skillType.heal : skillType.attack;
    playSkill(
        type,
        [
            skills[skillIndex]['hpEnemy'],
            skills[skillIndex]['enEnemy'],
            skills[skillIndex]['hpUser'],
            skills[skillIndex]['enUser']
        ],
        userLocation,
        enemyLocation
    );
}

function clickSkillCombat2() {
    var skillIndex = 2;
    let type = skills[skillIndex]['filename'].includes('heal') ? skillType.heal : skillType.attack;
    playSkill(
        type,
        [
            skills[skillIndex]['hpEnemy'],
            skills[skillIndex]['enEnemy'],
            skills[skillIndex]['hpUser'],
            skills[skillIndex]['enUser']
        ],
        userLocation,
        enemyLocation
    );
}

function clickSkillCombat3() {
    var skillIndex = 3;
    playSkill(
        skillType.heal,
        [
            skills[skillIndex]['hpEnemy'],
            skills[skillIndex]['enEnemy'],
            skills[skillIndex]['hpUser'],
            skills[skillIndex]['enUser']
        ],
        userLocation,
        enemyLocation
    );
}

function mouseoverSkillBattle0() {
    showDesc(skills[0]['description']);
}

function mouseoverSkillBattle1() {
    showDesc(skills[1]['description']);
}

function mouseoverSkillBattle2() {
    showDesc(skills[2]['description']);
}

function mouseoverSkillBattle3() {
    showDesc(skills[3]['description']);
}

//Camp Skills

function mouseoverSkillCamp0() {
    showDesc(skillsBonfire[0]['description']);
}

function mouseoverSkillCamp1() {
    showDesc(skillsBonfire[1]['description']);
}

function mouseoverSkillCamp2() {
    showDesc(skillsBonfire[2]['description']);
}

function playConversion() {
    var conversionValue = 40;
    var moneyCost = 20;
    var money = parseInt(localStorage.getItem('explore-meta-money'));
    var shards = parseInt(localStorage.getItem('explore-meta-shards'));
    if (money >= moneyCost) {
        money -= moneyCost;
        shards += conversionValue;
        updateMetaData(money, shards);
        alertMessage(` ${conversionValue} Shards gained from the fire`);
    } else {
        alertMessage(`not enough coins (${moneyCost})`);
    }
}

function playHealRest() { 
    var shardCost = 350;
    var shards = parseInt(localStorage.getItem('explore-meta-shards'));
    if (shards >= shardCost) {
        shards -= shardCost;
        updateMetaShards(shards);
        playHp(maxUserHp, chars.player);
        playEn(maxUserEn, chars.player);
        endRest();
        alertMessage(`You rest for a while...`);
    } else {
        alertMessage(`Not enough shards (${shardCost}) !`);
    }

}

function endCamp() {
    endRest();
    alertMessage('You watch the embers burn out');
}