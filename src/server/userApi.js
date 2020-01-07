//Router file for endpoint /user. Handeling new user, edit use
const express = require('express');
const router = express.Router();
const { getUserInformation } = require('./services/databaseServices.js')

router.get('/:userid', (req, res) => {
    const { userid } = req.params;
    const user = getUserInformation(userid);
    res.json(user);
});

router.post('/', (req, res) => {
    res.send(`Got post request for new user.`);
});

router.put('/:userid', (req, res) => {
    const { userid } = req.params;
    const user = getUserInformation(userid);
    res.send(`Got put request for user ${userid}`);
});

module.exports = router;