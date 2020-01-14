const express = require('express');
const router = express.Router();

//LOCAL
const { getFacts } = require('./services/databaseServices.js');
const { authenticate } = require('./services/authService.js');

router.get('/', authenticate, async (req, res) => {
    const facts = await getFacts();
    res.json(facts);
});

module.exports = router;
