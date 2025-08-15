const apiCall = require('../apiCall');

const generateToken = async () => {
    try { 
        const options = {
            data: {
                password: process.env.API_PASSWORD,
                username: process.env.API_USERNAME
            },
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            url: 'https://be-recruitment-task.onrender.com/auth/login'
        };
        const response = await apiCall(options);

        if (!response) 
            throw new Error('Failed to authenticate');
    
        // {
        //   "token": "gyprpu6m",
        //   "expiresIn": 60,
        //   "refreshToken": "xyz456"
        // }

        return response.token; // Adjust if the token property is named differently
    }
    catch (e) {
        throw new Error('Error generating token: ' + e);
    }
};

module.exports = generateToken;