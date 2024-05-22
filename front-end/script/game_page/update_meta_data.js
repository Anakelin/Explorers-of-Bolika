function updateMetaData(money, shards) {
    updateMetaMoney(money);
    updateMetaShards(shards);
}

function updateMetaMoney(money) {
    if (money > DATALIMIT) {
        money = DATALIMIT;
    }
    getDiv('meta-currency-money').innerHTML = money;
    localStorage.setItem('explore-meta-money', money);
}

function updateMetaShards(shards) {
    getDiv('meta-currency-shards').innerHTML = shards;
    localStorage.setItem('explore-meta-shards', shards);
}