const axios = require('axios');

const apiCall = async (options) => {
    try {
        const response = await axios(options);
 
        if(response && response.data) 
            return response.data;
        else throw new Error('No data received from API');
    }
    catch (e) {
        console.error('API call error:', e);

        return null;
        // throw new Error('API call failed: ' + e.message);
    }
};

module.exports = apiCall;