
const mongoose = require('mongoose')

exports.connectDB = (url) => {
    return mongoose.connect(url)
    .then(() => {
        console.log(`\n Connection to the Job-API database established ............ \n`)
    })
}