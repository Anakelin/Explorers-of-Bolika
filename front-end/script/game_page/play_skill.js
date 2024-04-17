var sk0 = getDiv("sk0");
var sk1 = getDiv("sk1");
var sk2 = getDiv("sk2");
var sk3 = getDiv("sk3");
function playSkill(id, user, enemy) {
    skill(id, user, enemy);
}

sk0.addEventListener("click", function() {
    playSkill(0);
});

sk1.addEventListener("click", function() {
    playSkill(1);
});

sk2.addEventListener("click", function() {
    playSkill(2);
});

sk3.addEventListener("click", function() {
    playSkill(3);
});