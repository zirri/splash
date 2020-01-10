//Router file for endpoint /user. Handeling new user, edit use
const express = require('express');
const router = express.Router();
const { getUserInformation, createNewUser } = require('./services/databaseServices.js');
const { validateUserInput } = require('./services/inputValidation.js');
const { authenticate } = require('./services/authService.js');

//middleware
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
router.get('/', authenticate, async (req, res) => {
    const { userId } = req.user;
    const user = await getUserInformation(userId);
    if(!user){
        res.status(400).send({error: 'unknown userid'})
    }
    res.json(user);
});

router.post('/', authenticate, async (req, res) => {
    const user = req.body;
    const newUser = await createNewUser(user);
    res.json(newUser);
});

router.put('/:userid', authenticate, async (req, res) => {
    const { userId } = req.user;
    res.send(`Got put request for user ${userId}`);
});

module.exports = router;