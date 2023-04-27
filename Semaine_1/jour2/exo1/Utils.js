function calculateTTC(priceHT) {
    const VAT = 0.2;
    const priceTTC = priceHT * (1 + VAT);
    return priceTTC.toFixed(2);
}

module.exports = { calculateTTC };