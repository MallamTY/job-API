const express = require('express');
const {userAuthenticator} = require('../middleware/userAuthurization')
const { createJob, 
        getSingleJob, 
        deleteJob, 
        getAllJobs, 
        updateJob } = require('../controllers/jobControllers');
const router = express.Router()


router.route('/create-job').post(userAuthenticator, createJob)

router.route('/:id').get(getSingleJob, deleteJob, updateJob)

router.route('/').get(getAllJobs)


module.exports = router
