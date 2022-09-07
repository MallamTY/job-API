const mongoose = require('mongoose');

const jobUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `The name field can't be blank`],
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email:{
        type: String,
        required: [true, `Please provide an email address`],
        unique: true,
        minlength: 3,
        match: ['\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b']
    },
    password: {
        type: String,
        required: [true, `Password field can't be empty`],
        minlength: [8, `Password can't be more than 8 characters`]

    },
    confirmpassword: {
        type: String,
        required: [true, `Password field can't be empty`],
        minlength: [8, `Password can't be more than 8 characters`]
        
    }
})


module.exports = mongoose.model('JobUsers', jobUserSchema)