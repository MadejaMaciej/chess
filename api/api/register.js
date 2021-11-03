// const express = require('express')
// const router = express.Router()
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()
// const { User } = require('../models/user')
// const { Passes } = require('../models/pass')
// const _ = require('lodash')
// const Joi = require('joi')
// const jwt = require('jsonwebtoken')
// const config = require('config')

// router.post('/',jsonParser, async (req, res) => {
//     if (!config.get('PrivateKey')) {
//         console.error('FATAL ERROR: PrivateKey is not defined.')
//         process.exit(1)
//     }
//     if(await User.countDocuments() == 0){
//         user = new User(_.pick({
//             name: req.body.username,
//             account: req.body.account, 
//             rating: [], 
//             games: { 
//                 started: [], 
//                 ongoing: [], 
//                 finished: []
//             }, 
//             admin: true, 
//             token: [{refreshToken: ''}, {currentToken: ''}, {adminToken: ''}], 
//             blocked: false, 
//             telegramUsername: '', 
//             chatId: '',
//             discordUsername: '', 
//             discordId: ''
//         }, ['name', 'account', 'rating', 'games', 'admin', 'token', 'blocked', 'telegramUsername', 'chatId','discordUsername','discordId']))
//         await user.save()
//         var tokens = user.token;
//         const refreshToken = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: '60d' })
//         tokens[0].refreshToken = refreshToken
//         const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: '1h' })
//         tokens[1].currentToken = token
//         const adminToken = jwt.sign({ _id: user._id }, config.get('PrivateKey'))
//         tokens[2].adminToken = adminToken
//         const filter = {
//             _id: user._id
//         }
//         const update = {
//             token: tokens
//         }
//         const result = await User.updateOne(filter, update)
//         return res.header('x-auth-token', token).send({respond: "UC", name: user.name, refreshToken: refreshToken, token: token, adminToken: adminToken})
//     }else{
//         var pass = await Passes.findOne({tokenPass: req.body.pass})
//         if(pass == null){
//             return res.send({respond: "HT"})
//         }
//         if(pass.used == true){
//             return res.send({respond: "HT"})
//         }
//         var check = jwt.verify(pass.tokenPass, config.get('PrivateKey'), (e)=>{
//             return e
//         })
    
//         if(check != null){
//             return res.send({respond: "HT"})
//         }
//         const { error } = validate(req.body);
//         if (error) {
//             return res.status(400).send(error.details[0].message);
//         }
//         let user = await User.findOne({ "account": { $regex : new RegExp(req.body.account, "i") } })
//         if(user){
//             return res.send({respond: 'UF', name: user.name, adminToken: user.token[2].adminToken})
//         }
//         user = await User.findOne({ "name": { $regex : new RegExp(req.body.username, "i") } })
//         if(user){
//             return res.send({respond: "HT"})
//         }
        
//         user = new User(_.pick({
//             name: req.body.username,
//             account: req.body.account, 
//             rating: [], 
//             games: { 
//                 started: [], 
//                 ongoing: [], 
//                 finished: []
//             }, 
//             admin: false, 
//             token: [{refreshToken: ''}, {currentToken: ''}, {adminToken: ''}], 
//             blocked: false, 
//             telegramUsername: '', 
//             chatId: '',
//             discordUsername: '', 
//             discordId: ''
//         }, ['name', 'account', 'rating', 'games', 'admin', 'token', 'blocked', 'telegramUsername', 'chatId','discordUsername','discordId']))
//         await user.save()
//         var tokens = user.token;
//         const refreshToken = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: '60d' })
//         tokens[0].refreshToken = refreshToken
//         const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: '1h' })
//         tokens[1].currentToken = token
//         const adminToken = jwt.sign({ _id: user._id }, config.get('PrivateKey'))
//         tokens[2].adminToken = adminToken
//         const filter = {
//             _id: user._id
//         }
//         const update = {
//             token: tokens
//         }
    
//         const filter2 = {
//             _id: pass._id
//         }
//         const update2 = {
//             used: true,
//             accountUsed: user.name
//         }
//         const result = await User.updateOne(filter, update)
//         const result2 = await Passes.updateOne(filter2, update2)
//         return res.header('x-auth-token', token).send({respond: "UC", name: user.name, refreshToken: refreshToken, token: token, adminToken: adminToken})
//     }
// })

// function validate(req) {
//     const schema = Joi.object({
//         account: Joi.string().min(1).max(100).required(),
//         username: Joi.string().min(1).max(50).required(),
//         pass: Joi.string().required()
//     });
//     const validation = schema.validate(req)
//     return validation;
// }

// module.exports = router