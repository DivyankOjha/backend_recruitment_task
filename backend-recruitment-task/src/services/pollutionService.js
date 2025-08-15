const apiCall = require('../helpers/apiCall');
const generateToken = require('../helpers/generateToken/generateToken');

const fetchPollutionData = async (countryCode, page, limit) => {
    try {
        const getToken = await generateToken();
        const options = {
            headers: {
                Authorization: 'Bearer ' + getToken,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            url: process.env.POLLUTION_API_URL + '/pollution' + `?country=${countryCode}&page=${page}&limit=${limit}`
        };

        const response = await apiCall(options);

        if (!response) 
            throw new Error('Failed to fetch pollution data');

        console.log('response', response);

        return response.results;
    }
    catch (e) {
        console.error('Error fetching pollution data:', e);
        throw new Error('Error fetching pollution data: ');
    }
};

module.exports = {
    fetchPollutionData
    
};