const joi = require('joi');

const userValidation = joi.object({
    username: joi.string().min(3).required().max(50),
    email: joi.string().email().required(),
    phone: joi.number().integer().min(1000000000).max(9999999999).required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid('STUDENT', 'TEACHER', 'ADMIN').required(),
});

module.exports = userValidation;

