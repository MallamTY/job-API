const jwt = require('jsonwebtoken')
const { LOGIN_SECRET } = require('../configurations/configurations')

exports.createToken = (id, username) => {
    const token = jwt.sign({id, username}, LOGIN_SECRET, {expiresIn: '3h'})
    return token
}