//Router file for endpoint /waterusage. handeling water data 

const express = require('express');
const router = express.Router();
const { getWaterUsage } = require('./services/databaseServices.js')




router.get('/user/:userid', async (req, res) => {
    const { userid } = req.params;
    const waterUsage = await getWaterUsage(userid);
    res.json(waterUsage);
})

module.exports = router;