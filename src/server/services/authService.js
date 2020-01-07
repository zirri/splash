const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

function authenticate(req, res, next){
    const token = req.headers['x-auth-token'];
    try{
        const { userId, fullName } = jwt.verify(token, new Buffer(secret, 'base64'));
        req.user = { userId, fullName };
        next();
    }catch(error){
        console.log(error)
        res.status(401).send({message: 'Unable to authenticate'})
    }
}

module.exports = {
    authenticate
}