//Router file for endpoint /waterusage. handeling water data 
const express = require('express');
const router = express.Router();
const { getWaterMetersByUser,insertNewWaterMeter } = require('./services/databaseServices.js');
const { validateWaterMeterData } = require('./services/inputValidation.js');
const { authenticate } = require('./services/authService.js');

//middleware

router.use('/', (req, res, next) => {
	if (req.method === 'GET') {
		return next();
	}
	const { room, source } = req.body;
	const waterMeterData = { room, source };
	let result = validateWaterMeterData(waterMeterData);
	if (result.error) {
		return res.status(400).json({ error: result.error });
	};
	next();
})

//endpoints
router.get('/', authenticate, async (req, res) => {
	const { userId } = req.user;
	const waterMeters = await getWaterMetersByUser(userId);
	res.json(waterMeters);
});

router.post('/', authenticate, async (req, res) => {
	const { meterId, room, source } = req.body;
	const waterMeterData = { meterId, room, source };
	waterMeterData.userId = req.user.userId;
	const newRecord = await insertNewWaterMeter(waterMeterData);
	res.json(newRecord);
})


module.exports = router;