const express = require('express');
//const userAuthenticator = require('../middleware/auth')
const { createJob, 
        getSingleJob, 
        deleteJob, 
        getAllJobs, 
        updateJob } = require('../controllers/jobControllers');
const router = express.Router()

//router.use(userAuthenticator)


router.route('/create-job').post(createJob)

router.route('/:id').get(getSingleJob, deleteJob, updateJob)

router.route('/').get(getAllJobs)


module.exports = router
