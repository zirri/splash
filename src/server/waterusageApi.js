//Router file for endpoint /waterusage. handeling water data 

const express = require('express');
const router = express.Router();
const { getWaterUsage, updateWaterMetering } = require('./services/databaseServices.js');
const { validateMeterId, validateMeteringData } = require('./services/inputValidation.js');
const { authenticate } = require('./services/authService.js');

//middleware

router.use('/metering/:meterId', (req, res, next) => {
    const { meterId } = req.params;
    const { amount, timestamp } = req.body;
    const waterData = { amount, timestamp };
    let result = validateMeterId(meterId);
    if(result.error){
        return res.status(400).json({error: result.error});
    };
    result = validateMeteringData(waterData);
    if(result.error){
        return res.status(400).json({error: result.error});
    }
    next();
})

//endpoints
router.get('/', authenticate, async (req, res) => {
    const { userId } = req.user;
    const waterUsage = await getWaterUsage(userId);
    res.json(waterUsage);
})

router.post('/metering/:meterId', async (req, res) => {
    const { meterId } = req.params;
    const { amount, timestamp } = req.body;
    const waterData = { amount, timestamp };
    waterData['meterId'] = meterId;
    const newRecord = await updateWaterMetering(waterData);
    res.json(newRecord);
})



module.exports = router;