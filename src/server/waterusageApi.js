//Router file for endpoint /waterusage. handeling water data 

const express = require('express');
const router = express.Router();
const { getWaterUsage, updateWaterMetering } = require('./services/databaseServices.js');
const { validateUserId, validateMeterId, validateMeteringData } = require('./services/inputValidation.js');

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

router.use('/:userid', (req, res, next) => {
    const { userid } = req.params;
    if(userid==='metering'){ next();}
    const result = validateUserId(userid);
    if(result.error){
        return res.status(400).json({error: result.error});
    }
    next();
})


//endpoints
router.get('/user/:userid', async (req, res) => {
    const { userid } = req.params;
    const waterUsage = await getWaterUsage(userid);
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