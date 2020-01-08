//Router file for endpoint /session. setting and cheking token 
const { authenticate, logInAndGetToken } = require('./services/authService.js');
const express = require('express');
const router = express.Router();

router.get('/', authenticate, (req,res) => {
    res.send({
        message: 'You are authenticated'
    });
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const result = await logInAndGetToken(email, password);
    if(result.error){
        res.status(result.status).send(result.error)
    }
    res.json({token: result.token})
});

module.exports = router;