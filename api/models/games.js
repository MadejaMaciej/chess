const Joi = require('joi');
const mongoose = require('mongoose');

const Game = mongoose.model('Game', new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        unique: true
    },
    gameType: {
        type: String,
        required: true
    },
    pgn: {
        type: String,
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
    }
}))
 
function validateGame(game) {
    const schema = Joi.object({
           UUID: Joi.string().required(),
           gameType: Joi.string().required(),
           pgn: Joi.string().required(),
           fens: Joi.array().required(),
           players: Joi.object().required(),
           gameSettings: Joi.object().required(),
           logs: Joi.array().required()
    })
    const validation = schema.validate(game)
    return validation
}
 
exports.Game = Game
exports.validate = validateGame