const Joi = require('joi');

const useridSchema = {
    userid: Joi.number().integer().positive().required()
};


function validateUserId(userid){
    const result = Joi.validate({userid}, useridSchema);
    if(result.error){
        return {error: `Validation of user id failed: ${result.error.details[0].message}`};
    }
    return {error: null};
}

const userSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fullName: Joi.string().required(),
    location: Joi.string().required(),
    noInHousehold: Joi.number().integer().positive().less(11).required()
};

function validateUserInput(user){
    const result = Joi.validate({...user}, userSchema);
    if(result.error){
        return {error: `Validation of user (body) failed: ${result.error.details[0].message}`};
    }
    return {error: null};
} 

module.exports = {
    validateUserInput, 
    validateUserId
}