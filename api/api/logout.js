const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const { User } = require('../models/users')
const Joi = require('joi')
const config = require('config')
const { logoutUser } = require('../utils/logout')

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

    if(user){
        const result = await logoutUser(user)
        if(result){
            return res.send({response: "User Logged Out"})
        }else{
            return res.status(500).send({error: "Internal server error"})
        }
    }
    
    return res.status(404).send({error: "User Not Found"})
})

var validate = (req) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(50).required()
    })
    const validation = schema.validate(req)
    return validation
}

module.exports = router