//Router file for endpoint /session. setting and cheking token 
const { authenticate } = require('./services/authService.js');
const { getUserByEmail } = require('./services/databaseServices.js');
const express = require('express');
const router = express.Router();
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

router.get('/', authenticate, (req,res) => {
    res.send({
        message: 'You are authenticated'
    });
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if(!user){
        return res.status(401).json({error: 'Unknown user'});
    }
    if(user.password !== password){
        return res.status(401).json({error: 'Wrong password'});
    }
    const token = jwt.sign({
        userId: user.userId,
        fullName: user.fullName
    }, new Buffer(secret, 'base64'));
    res.json({token})
});

module.exports = router;