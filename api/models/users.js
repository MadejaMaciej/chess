const Joi = require('joi');
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    ratings: {
        type: Array,
        required: true
    }, 
    gamesIds: {
        type: Array,
        required: true
    },
    admin: {
        type: Boolean,
        requierd: true
    },
    blocked: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    temporaryToken: {
        type: String,
        required: true
    }
}))
 
function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        password: Joi.string().required(),
        ratings: Joi.array().required(),
        gamesIds: Joi.array().required(),
        admin: Joi.boolean().required(),
        blocked: Joi.boolean().required(),
        token: Joi.string().required(),
        refreshToken: Joi.string().required(),
        temporaryToken: Joi.string().required()
    })
    const validation = schema.validate(user)
    return validation
}
 
exports.User = User
exports.validate = validateUser