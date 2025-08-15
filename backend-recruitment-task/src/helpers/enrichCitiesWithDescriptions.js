const cache = require('../cache/cache');
const wikipediaService = require('../services/wikipediaService');

const enrichCitiesWithDescriptions = async (cities) => {
    return Promise.all(
        cities.map(async (city) => {
            const cacheKey = city.city;
            let description = cache.get(cacheKey);

            if (!description) {
                description = await wikipediaService.fetchDescription(city.city);
                cache.set(cacheKey, description);
            }

            return {
                ...city,
                description 
            };
        })
    );
};

module.exports = enrichCitiesWithDescriptions;