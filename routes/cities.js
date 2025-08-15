const express = require('express');
const citiesController = require('../controllers/citiesController');
const rateLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.get('/cities', rateLimiter, citiesController.getCities);

module.exports = router;