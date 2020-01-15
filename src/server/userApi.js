//Router file for endpoint /user. Handeling new user, edit use
const express = require('express');
const router = express.Router();
const { getUserByEmail, getUserInformation, createNewUser } = require('./services/databaseServices.js');
const { validateUserInput } = require('./services/inputValidation.js');
const { authenticate } = require('./services/authService.js');

//middleware
router.use('/', (req, res, next) => {
    if(req.method === 'GET'){
        return next();
    
    }
    const {email, fullName, password, location, noInHousehold} = req.body;
    const user =  {email, fullName, password, location, noInHousehold};
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

router.post('/', async (req, res) => {
    const {email, fullName, password, location, noInHousehold} = req.body;
    const user =  {email, fullName, password, location, noInHousehold};
    const userExist = await getUserByEmail(user.email);
    if(userExist){
        return res.status(401).json({error: 'user already registred, please log in instead'})
    }
    const newUser = await createNewUser(user);
    res.json(newUser);
});

router.put('/', authenticate, async (req, res) => {
    const { userId } = req.user;
    res.send(`Got put request for user ${userId}`);
});

module.exports = router;