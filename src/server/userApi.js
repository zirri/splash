//Router file for endpoint /user. Handeling new user, edit use
const express = require('express');
const router = express.Router();
const { getUserInformation, createNewUser } = require('./services/databaseServices.js')

router.get('/:userid', async (req, res) => {
    const { userid } = req.params;
    const user = await getUserInformation(userid);
    res.json(user);
});

router.post('/', async (req, res) => {
    const user = req.body;
    const newUser = await createNewUser(user);
    res.json(newUser);
});

router.put('/:userid', async (req, res) => {
    const { userid } = req.params;
    res.send(`Got put request for user ${userid}`);
});

module.exports = router;