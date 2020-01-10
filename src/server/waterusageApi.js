//Router file for endpoint /waterusage. handeling water data 

const express = require('express');
const router = express.Router();
const { getWaterUsage, updateWaterMetering } = require('./services/databaseServices.js');
const { validateMeterId, validateMeteringData } = require('./services/inputValidation.js');
const { authenticate } = require('./services/authService.js');

//middleware

router.use('/metering/:waterMeterId', (req, res, next) => {
    const { waterMeterId } = req.params;
    const waterData = req.body;
    let result = validateMeterId(waterMeterId);
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

router.get('/metering/:waterMeterId', async (req, res) => {
    const { waterMeterId } = req.params;
    const { waterData } = req.body;
    console.log('test')
    waterData.waterMeterId = waterMeterId;
    const newRecord = await updateWaterMetering(waterData);
    res.json(newRecord);
})



module.exports = router;