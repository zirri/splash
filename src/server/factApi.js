const express = require('express');
const router = express.Router();

//LOCAL
const { getFacts } = require('./services/databaseServices.js');
const { authenticate } = require('./services/authService.js');

router.get('/', authenticate, async (req, res) => {
    const fact = await getFacts();
    res.json(fact);
});

module.exports = router;
