const reformatData = (data, countryCode) => data.map(c => ({
    city: c.name,
    countryCode: countryCode,
    pollution: c.pollution
}));

module.exports = reformatData;