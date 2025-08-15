const isValidCity = require('../utils/cityValidator');

const filterValidCities = (normalizedData) => {
    const seen = new Set();
    const validCities = normalizedData.filter(entry => isValidCity(entry, seen));

    return validCities;
};

module.exports = filterValidCities;