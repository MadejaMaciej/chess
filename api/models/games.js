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
    }
}))
 
function validateGame(game) {
    const schema = Joi.object({
        
    })
    const validation = schema.validate(game)
    return validation;
}
 
exports.Game = Game;
exports.validate = validateGame;