const enrichCitiesWithDescriptions = require('../helpers/enrichCitiesWithDescriptions');
const filterValidCities = require('../helpers/filterValidCities');
const reformatData = require('../helpers/reformatData');
const pollutionService = require('../services/pollutionService');

const getCities = async (req, res) => {
    try {
        let page = req.query.page;
        let limit = req.query.limit;

        if (!page || isNaN(page))
            page = 1;

        page = parseInt(page);

        if (limit || isNaN(limit))
            limit = 10;

        limit = parseInt(limit);
        const countryCode = req.query.countryCode;

        if (!countryCode) {
            return res.status(400).json({
                error: 'Country code is required'
            });
        }
      
        const pollutionData = await pollutionService.fetchPollutionData(countryCode, page, limit);
        const normalized = reformatData(pollutionData, countryCode);
        const validCities = filterValidCities(normalized);

        const enriched = await enrichCitiesWithDescriptions(validCities,);

        res.status(200).json({
            cities: enriched,
            limit,
            page,
            total: enriched.length
        });
    }
    catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({
            error: 'Something went wrong' 
        });
    }
};

module.exports = {
    getCities
};