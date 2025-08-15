const apiCall = require('../helpers/apiCall');
const fetchDescription = async (cityName) => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
            url: process.env.WIKIPEDIA_API_URL + `/${cityName}`
        };
        const response = await apiCall(options);

        if (!response) return '';

        return response.extract || '';
    }
    catch (e) {
        console.error(e);

        return '';
    }
};

module.exports = {
    fetchDescription
};