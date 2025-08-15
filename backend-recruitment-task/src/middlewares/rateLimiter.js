const {
    ipKeyGenerator, rateLimit
} = require('express-rate-limit');

const rateLimiter = rateLimit({
    
    // Safe IPv4 + IPv6 handling
    handler: (req, res) => {
        res.setHeader('X-RateLimit-Limit', req.rateLimit.limit);
        res.setHeader('X-RateLimit-Current', req.rateLimit.current);
        res.setHeader('X-RateLimit-Remaining', req.rateLimit.remaining);
        res.setHeader('Retry-After', Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000));

        res.status(429).json({
            message: 'Too many requests, please try again later.'
        });
    }, 
    
    keyGenerator: ipKeyGenerator,
    
    legacyHeaders: false, 
    // 10 seconds
    max: 5,
    standardHeaders: true,
    windowMs: 10 * 1000
});

module.exports = rateLimiter;
