function calculateTTC(priceHT) {
    const VAT = 0.2; // 20% VAT rate
    const priceTTC = priceHT * (1 + VAT);
    return priceTTC.toFixed(2); // round to 2 decimal places
}

module.exports = { calculateTTC };