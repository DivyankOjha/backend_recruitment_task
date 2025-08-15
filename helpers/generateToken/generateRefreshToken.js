const apiCall = require('../apiCall');
const cache = require('../../cache/cache');

const generateRefreshToken = async () => {
    const refreshToken = cache.get('refreshToken'); 
    const options = {
        data: {
            refreshToken: refreshToken
        },
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        url: `${process.env.POLLUTION_API_URL}/auth/refresh`
    };
    const response = await apiCall(options);

    console.log('Response from refresh token:', response);

    if (response && response.token) {
        cache.set('authToken', response.token, response.expiresIn * 1000); 

        return response.token;
    }
    else return null;
};

module.exports = generateRefreshToken;