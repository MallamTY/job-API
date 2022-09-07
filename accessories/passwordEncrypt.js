const bcrypt = require('bcrypt');


exports.passwordEncrypter = async(password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const hashedConfirmPassword = await bcrypt.hash(password, salt)
    return hashedPassword; hashedConfirmPassword
}