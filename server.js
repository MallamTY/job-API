
const express = require('express');
const morgan = require('morgan')
const jobRoutes = require('./routes/jobRoute');
const jobUserRoutes = require('./routes/jobUserRoutes');
const { MONGO_URI, PORT } = require('./configurations/configurations');
const { connectDB } = require('./db/dbConnect');
const app = express()



app.use(express.json())
app.use(morgan('common'))
app.use('/app/api/', jobRoutes)
app.use('/app/api/', jobUserRoutes)



const start = async() => {
    try {
        const port = PORT || 3000
        await connectDB(MONGO_URI)
        app.listen(port, () => {
            console.log(`\nJob-API server spinned up and running on port ${port} \n`);
            
        
        })
    } catch (error) {
        console.log(error);
    }
}


start()