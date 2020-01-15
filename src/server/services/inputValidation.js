const Joi = require('joi');

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

const meterIdSchema = {
    waterMeterId: Joi.number().integer().required()
};

function validateMeterId(waterMeterId){
    const result = Joi.validate({waterMeterId}, meterIdSchema);
    if(result.error){
        return {error: `Validation of waterMeterId failed: ${result.error.details[0].message}`};
    }
    return {error: null};
} 

const waterDataSchema = {
    timestamp: Joi.string(),//Joi.date().timestamp().required(),
    amount: Joi.number().positive().required()
};

function validateMeteringData(meteringData){
    const result = Joi.validate({...meteringData}, waterDataSchema);
    if(result.error){
        return {error: `Validation of metering data (body) failed: ${result.error.details[0].message}`};
    }
    return {error: null};
} 

const waterMeterSchema = {
    room: Joi.string().required(),
    source: Joi.string().required()
};

function validateWaterMeterData(waterMeterData){
    const result = Joi.validate({...waterMeterData}, waterMeterSchema);
    if(result.error){
        return {error: `Validation of water meter data (body) failed: ${result.error.details[0].message}`};
    }
    return {error: null};
}

module.exports = {
    validateUserInput, 
    validateMeterId, 
    validateMeteringData,
    validateWaterMeterData
}