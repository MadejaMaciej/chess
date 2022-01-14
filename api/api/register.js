const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const { User } = require('../models/users')
const _ = require('lodash')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')
const salt = 10

router.post('/',jsonParser, async (req, res) => {
    if (!config.get('PrivateKey')) {
        console.error('FATAL ERROR: PrivateKey is not defined.')
        process.exit(1)
    }
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send({error: "Bad data"})
    }

    var user = await User.findOne({username: req.body.username})

    if(user){
        return res.send({error: "User Found"})
    }

    var pass = await bcrypt.hash(req.body.password, salt)
    const refreshToken = jwt.sign({ pk: config.get('PrivateKey') }, config.get('PrivateKey'), {expiresIn: '60d' })
    const token = jwt.sign({ pk: config.get('PrivateKey') }, config.get('PrivateKey'), {expiresIn: '1h' })
    const tempToken = jwt.sign({ pk: config.get('PrivateKey') }, config.get('PrivateKey'))
    try{
        user = new User(_.pick({
            username: req.body.username,
            password: pass, 
            ratings: [{type: 'blitz', rating: 1500}],
            admin: false, 
            blocked: false, 
            token: token, 
            refreshToken: refreshToken,
            temporaryToken: tempToken
        }, ['username', 'password', 'ratings', 'admin', 'blocked', 'token', 'refreshToken', 'temporaryToken']))
        await user.save()
        return res.header('x-auth-token', token).send({response: "User Created", username: user.username, refreshToken: refreshToken, token: token})
    }catch(e){
        return res.send({error: "Something went wrong", errorDesc: e})
    }
})

var validate = (req) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required(),
        password: Joi.string().required(),
    })
    const validation = schema.validate(req)
    return validation
}

module.exports = router