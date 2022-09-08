const User = require("../models/jobUserModel")
const {StatusCodes} = require('http-status-codes')
const bcrypt = require('bcrypt')
const validator = require('validator')
const { passwordEncrypter } = require("../accessories/passwordEncrypt")

const registerUser = async(req, res) => {
    const {name, email, username, password, confirmPassword} = req.body

    if (!name || !email, !username, !password, !confirmPassword) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            status: 'Failed !!!!!!!!',
            message: `All fields must be filed`
        })
    }

    if (! validator.isEmail(email)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            status: 'Failed !!!!!!!!',
            message: `Invalid email address`
        })
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            status: 'Failed !!!!!!!!',
            message: `Password not strong enough`
        })
    }

    if (!validator.isStrongPassword(confirmPassword)) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            status: 'Failed !!!!!!!!',
            message: `Password not strong enough`
        })
    }

    if (password !== confirmPassword) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            status: 'Failed !!!!!!!!',
            message: `Passwords does not match`
        })
    }
    try {
        
         let user = await User.findOne({$or: [{email}, {username}]})

         if (user) {
             return res.status(StatusCodes.FORBIDDEN).json({
                 status: `Failed .........`,
                 message:  `User already exist !!!`
             })
         }
                const hashedPassword = await passwordEncrypter(password)
                const hashedConfirmPassword = await passwordEncrypter(password)

            //    const salt = await bcrypt.genSalt(10)
            //    const hashedPassword = await bcrypt.hash(password, salt)
            //    hashedConfirmPassword = await bcrypt.hash(confirmPassword, salt)
         user = await User.create({name,
                                    email,
                                    username,
                                    password: hashedPassword, 
                                    confirmPassword: hashedConfirmPassword
                            })
        res.status(StatusCodes.CREATED).json({
            status: `Success .....`,
            message: `Registration successful ...`,
            user
        })


    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
    


}

const userLogin = async(req, res) => {
    const {email, username, password} = req.body
    if (!(email || username) || !password) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            status: `Failed !!!!`,
            message: `All fields must be filled ....`
        })
    }

    var user = await User.findOne({$or: [{email}, {username}]});
    console.log(user);
    if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: `Failed !!!`,
            message: `Invalid login credentials !!!`
        })
    }
    var match = await bcrypt.compare(password, user.password)

    if (!match) {
        return res.status(StatusCodes.NOT_ACCEPTABLE).json({
            status: `Operation failed !!!`,
            message: `Invalid login credentials !!!`
        })
    }
    return res.status(StatusCodes.OK).json({
        status: `Success ...`,
        message: `Login successful`,
        user
    })
}



module.exports = {
    registerUser,
    userLogin
}
