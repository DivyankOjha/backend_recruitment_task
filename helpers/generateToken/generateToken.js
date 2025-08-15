const apiCall = require('../apiCall');
const cache = require('../../cache/cache');
const generateRefreshToken = require('./generateRefreshToken');

const generateToken = async () => {
    try {
        if (cache.get('authToken')) {
            console.log('Token is cached');

            return cache.get('authToken');
        }
 
        // If token is not cached, make an API call to get a new token  
        if (cache.get('refreshToken')) {
            const token = await generateRefreshToken();

            if(token)
                return token;
        }
        
        const options = {
            data: {
                password: process.env.API_PASSWORD,
                username: process.env.API_USERNAME
            },
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: `${process.env.POLLUTION_API_URL}/auth/login`
        };
        const response = await apiCall(options);

        if (!response) 
            throw new Error('Failed to authenticate');
       
        cache.set('authToken', response.token, response.expiresIn * 1000); // Cache for the token duration in milliseconds
        cache.set('refreshToken', response.refreshToken, response.expiresIn * 1000);

        return response.token; 
    }
    catch (e) {
        throw new Error('Error generating token: ' + e);
    }
};

module.exports = generateToken;