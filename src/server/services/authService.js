const { getUserByEmail } = require('./databaseServices.js');
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

async function logInAndGetToken(email, password){
    const user = await getUserByEmail(email);

    if(!user){
        return ({status: 401,
                error: 'Unknown user'});
    }
    if(user.password !== password){
        return ({status: 401, 
                error: 'Wrong password'});
    }
    const token = jwt.sign({
        userId: user.userId,
        fullName: user.fullName
    }, new Buffer(secret, 'base64'));
    return({
        status:200,
        token
    })
}

module.exports = {
    authenticate,
    logInAndGetToken
}