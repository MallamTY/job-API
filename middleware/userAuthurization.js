const jwt = require('jsonwebtoken');
const { LOGIN_SECRET } = require('../configurations/configurations');
const UnauthorizedRequest = require('../error/unathorizedRequest')


const userAuthenticator = (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization) {
        throw new UnauthorizedRequest('Authorization failed !!!')
    }

    const token = authorization.split(' ')[1]
    try {
        const payload =  jwt.verify(token, LOGIN_SECRET)
        req.user = {userId: payload.id, username: payload.username}

        next()

    } catch (error) {
        throw new UnauthorizedRequest('Authorization failed !!!')
    }
}

module.exports = {userAuthenticator}
 