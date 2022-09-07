const express = require('express');
const { registerUser,
        userLogin } = require('../controllers/jobUserControllers');
const router = express.Router()


router.route('/register').post(registerUser);

router.route('/login').post(userLogin)


module.exports = router