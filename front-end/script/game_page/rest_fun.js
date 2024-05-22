function startRest() {
    getDiv(`sk${0}`).removeEventListener("click", clickSkillCombat0);
    getDiv(`sk${1}`).removeEventListener("click", clickSkillCombat1);
    getDiv(`sk${2}`).removeEventListener("click", clickSkillCombat2);
    getDiv(`sk${3}`).removeEventListener("click", clickSkillCombat3);

    getDiv(`sk${1}`).addEventListener("click", playConversion);
    getDiv(`sk${2}`).addEventListener("click", playHealRest);
    getDiv(`sk${3}`).addEventListener("click", endRest);

    getDiv("explore-box").classList.add("unload");
    getDiv('monster-char').classList.add("unload");
    getDiv('monster-ui').classList.add("unload");
    getDiv("battle-box").classList.add("load");
    getDiv("rest-fire-box").classList.add("load");
    getDiv("curtain").classList.add("active-curtain");
    getDiv('user-char').style = `background-image: url("./resources/media/char/torchbearers/${torchbearer['name']}/rest.png");`;
    alertMessage("You find some firewood!");
    buildSkillsBonfire();
}

function endRest() {
    getDiv("curtain").classList.remove("active-curtain");
    getDiv('monster-char').classList.remove("unload");
    getDiv('monster-ui').classList.remove("unload");
    getDiv("battle-box").classList.remove("load");
    getDiv("explore-box").classList.remove("unload");
    getDiv('user-char').style = `background-image: url("./resources/media/char/torchbearers/${torchbearer['name']}/base.png");`;
    getDiv(`sk${0}`).classList.remove("unload");
    getDiv("rest-fire-box").classList.remove("load");
    getDiv(`sk${1}`).removeEventListener("click", playConversion);
    getDiv(`sk${2}`).removeEventListener("click", playHealRest);
    getDiv(`sk${3}`).removeEventListener("click", endRest);
    alertMessage("The embers burn out");
    buildSkillsNormal();
}