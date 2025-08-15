const NodeCache = require('node-cache');
const cache = new NodeCache({
    stdTTL: process.env.CACHE_EXPIRATION
}); 

module.exports = cache;