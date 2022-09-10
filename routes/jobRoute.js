const express = require('express');
const {userAuthenticator} = require('../middleware/userAuthurization')
const { createJob, 
        getSingleJob, 
        deleteJob, 
        getAllJobs, 
        updateJob } = require('../controllers/jobControllers');
const router = express.Router()


router.route('/create-job').post(userAuthenticator, createJob)

router.route('/:id').get(userAuthenticator, getSingleJob, deleteJob)

router.route('/:id').patch(userAuthenticator, updateJob)

router.route('/').get(userAuthenticator, getAllJobs)


module.exports = router
