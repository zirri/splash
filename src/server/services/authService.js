const bcrypt = require('bcryptjs');
const { getUserByEmail } = require('./databaseServices.js');
const secret = process.env.SECRET;
const jwt = require('jsonwebtoken');

function authenticate(req, res, next){
    const token = req.headers['x-auth-token'];
    try{
        const { userId, fullName } = jwt.verify(token, new Buffer.from(secret, 'base64'));
        req.user = { userId, fullName };
        next();
    }catch(error){
        res.status(401).send({error: 'Unable to authenticate'})
    }
}

async function logInAndGetToken(email, password){
    if(typeof(email)!=='string' || typeof(password)!=='string'){
        return ({status: 401,
            error: 'Wrong data type for input'});
    }
    const user = await getUserByEmail(email);

    if(!user){
        return ({status: 401,
                error: 'Unknown user'});
    }

    if(!bcrypt.compareSync(password, user.password)){
        return ({status: 401, 
                error: 'Wrong password'});
    }
    const token = jwt.sign({
        userId: user.userId,
        fullName: user.fullName
    }, new Buffer.from(secret, 'base64'));
    return({
        status:200,
        token
    })
}

module.exports = {
    authenticate,
    logInAndGetToken
}