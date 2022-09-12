
const express = require('express');
const morgan = require('morgan')
const jobRoutes = require('./routes/jobRoute');
const jobUserRoutes = require('./routes/jobUserRoutes');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit')
const { MONGO_URI, PORT } = require('./configurations/configurations');
const { connectDB } = require('./db/dbConnect');
const app = express()




app.get('/', (req, res) => {
    res.send('Jobs-API by MallamTY')
})
app.set('ttrust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(morgan('common'))



app.use('/app/api/',  jobRoutes)
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

