const { User } = require('../models/users')

var logoutUser = async (user) => {
    const filter = {
        _id: user._id
    }
    const update = {
        token: null,
        refreshToken: null
    }
    const result = await User.updateOne(filter, update)
    return result
}

module.exports = { logoutUser }