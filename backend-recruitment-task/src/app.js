const express = require('express');
const citiesRoutes = require('./routes/cities');

require('dotenv').config();
require('./cache/cache');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(citiesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});