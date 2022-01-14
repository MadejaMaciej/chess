const Joi = require('joi');
const mongoose = require('mongoose');

const Game = mongoose.model('Game', new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        unique: true
    },
    pgn: {
        type: Array,
        required: true
    },
    fens: {
        type: Array,
        required: true
    },
    players: {
        type: Object,
        required: true
    },
    gameSettings: {
        type: Object,
        required: true
    },
    logs: {
        type: Array,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    },
    username1: {
        type: String,
        required: true
    },
    username2: {
        type: String,
        required: true
    }
}))
 
function validateGame(game) {
    const schema = Joi.object({
           UUID: Joi.string().required(),
           pgn: Joi.array().required(),
           fens: Joi.array().required(),
           players: Joi.object().required(),
           gameSettings: Joi.object().required(),
           logs: Joi.array().required(),
           finished: Joi.boolean.required(),
           username1: Joi.string().required(),
           username2: Joi.string().required()
    })
    const validation = schema.validate(game)
    return validation
}
 
exports.Game = Game
exports.validate = validateGame