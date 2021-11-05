const jwt = require('jsonwebtoken')
const config = require('config')
const { User } = require('../models/users')

var checkToken = (userToken, token) => {
    var check = jwt.verify(userToken, config.get('PrivateKey'), (e)=>{
        return e
    })
    if(check == null){
        if(userToken == token){
            return true
        }
        return false
    }else{
        return false
    }
}

var askNewToken = async (refreshToken, token, user) => {
    if(checkToken(refreshToken, token)){
        if(user){;
            const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'), {expiresIn: '1h' })
            const filter = {
                _id: user._id
            }
            const update = {
                token: token
            }
            const result = await User.updateOne(filter, update)
            if(result){
                return token
            }else {
                return false
            }
        }
    }else{
        return false
    }
}

module.exports = { checkToken, askNewToken }
