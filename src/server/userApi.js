//Router file for endpoint /user. Handeling new user, edit use
const express = require('express');
const router = express.Router();
const { getUserInformation, createNewUser } = require('./services/databaseServices.js');
const { validateUserInput, validateUserId } = require('./services/inputValidation.js');

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

router.use('/', (req, res, next) => {
    if(req.method === 'GET'){
        return next();
    }
    const user = req.body;
    const result = validateUserInput(user);
    if(result.error){
        res.status(400).json({error: result.error});
    }else{
        next();
    }
})

//endpoints
router.get('/:userid', async (req, res) => {
    const { userid } = req.params;
    const user = await getUserInformation(userid);
    if(!user){
        res.status(400).send({error: 'unknown userid'})
    }
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