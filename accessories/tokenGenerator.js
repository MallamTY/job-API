const jwt = require('jsonwebtoken')
const { LOGIN_SECRET } = require('../configurations/configurations')

exports.createToken = (id, detail) => {
    const token = jwt.sign({id, detail}, LOGIN_SECRET, {expiresIn: '3h'})
    return token
}