const router = require("../routes/jobRoutes")

const registerUser = async(req, res) => {
    res.json(`User registered ........`)
}

const userLogin = async(req, res) => {
    res.json(`Login successful ......`)
}



module.exports = {
    registerUser,
    userLogin
}
