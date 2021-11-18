const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const { User } = require('../models/users')
const Joi = require('joi')
const config = require('config')
const { logoutUser } = require('../utils/logout')
const { checkToken, askNewToken} = require('../utils/tokens')
const { checkIfBlocked } = require('../utils/block')

router.post('/',jsonParser, async (req, res) => {
    if (!config.get('PrivateKey')) {
        console.error('FATAL ERROR: PrivateKey is not defined.')
        process.exit(1)
    }

    const { error } = validate(req.body)
    if (error) {
        return res.send({error: "Bad data"})
    }

    var user = await User.findOne({username: req.body.username})

    if(!user){
        return res.send({error: "User Not Found"})
    }

    if(checkIfBlocked(user)){
        return res.send({error: "Blocked"})
    }

    var check = checkToken(user.token, req.body.token)
    if(!check){
        check = await askNewToken(user.refreshToken, req.body.refreshToken, user)
        if(!check){
            const result = await logoutUser(user)
            return res.send({error: "User is not authorized"})
        }
        return res.send({response: "User is authorized", token: check})
    }

    return res.send({response: "User is authorized"})
})

var validate = (req) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        token: Joi.string().required(),
        refreshToken: Joi.string().required()
    })
    const validation = schema.validate(req)
    return validation
}

module.exports = router