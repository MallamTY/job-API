const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company : {
        type: String,
        required: [true, `Job title can't be empty`],
        trim: true,
        minlength: [3, `Company name can't be less than 3 characters`]

    },
    position:{
        type: String,
        required: [true, `Position applied for can't be empty`],
        trim: true,
        minlength: [2, `Position field can't be less than 2 characters`]
    },
    status:{
        type: String,
        enum: ['Completed', 'Uncompleted'],
        required: [true, `Status can't be empty`]

    }
    
})