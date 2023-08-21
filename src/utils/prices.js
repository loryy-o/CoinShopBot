function getRate(amount) {
    if (amount >= 1000) { return 0.08; }
    else if (amount >= 500) { return 0.085; }
    else { return 0.09; }
}

function getSellRate(amount) {
    if (amount >= 1000) { return 0.055; }
    else if (amount >= 500) { return 0.05; }
}

function calcPrice(amount) {
    return amount * getRate(amount);
}

function calcSellPrice(amount) {
    return amount * getSellRate(amount);
}

module.exports = { getRate, calcPrice, getSellRate, calcSellPrice };