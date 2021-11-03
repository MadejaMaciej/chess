const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const { User } = require('../models/users')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcrypt')

router.post('/',jsonParser, async (req, res) => {
    if (!config.get('PrivateKey')) {
        console.error('FATAL ERROR: PrivateKey is not defined.')
        process.exit(1)
    }
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    var user = await User.findOne({username: req.body.username})

    if(!user){
        return res.status(404).send({error: "User Not Found"})
    }

    var pass = await bcrypt.compare(req.body.password, user.password)
    if(pass){
        const refreshToken = jwt.sign({ id: user._id }, config.get('PrivateKey'), {expiresIn: '60d' })
        const token = jwt.sign({ id: user._id }, config.get('PrivateKey'), {expiresIn: '1h' })
        const filter = {
            _id: user._id
        }
        const update = {
            token: token,
            refreshToken: refreshToken
        }
        const result = await User.updateOne(filter, update)
        return res.header('x-auth-token', token).send({response: "User Logged In", refreshToken: refreshToken, token: token})
    }else{
        return res.status(401).send({error: "Bad password"})
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