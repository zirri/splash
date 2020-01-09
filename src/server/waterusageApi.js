//Router file for endpoint /waterusage. handeling water data 

const express = require('express');
const router = express.Router();
const { getWaterUsage } = require('./services/databaseServices.js')

//middleware
router.use('/:userid', (req, res, next) => {
    const { userid } = req.params;
    const result = validateUserId(userid);
    if(result.error){
        res.status(400).json({error: result.error});
    }else{
        next();
    }
})

router.get('/user/:userid', async (req, res) => {
    const { userid } = req.params;
    const waterUsage = await getWaterUsage(userid);
    res.json(waterUsage);
})

module.exports = router;