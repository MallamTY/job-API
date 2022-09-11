const express = require('express');
const {userAuthenticator} = require('../middleware/userAuthurization')
const { createJob, 
        getSingleJob, 
        deleteJob, 
        getAllJobs, 
        updateJob, 
        getByStatus} = require('../controllers/jobControllers');
const router = express.Router()


router.route('/create-job').post(userAuthenticator, createJob)

router.route('/:id').get(userAuthenticator, getSingleJob).delete(userAuthenticator, deleteJob)

router.route('/:id').patch(userAuthenticator, updateJob)

router.route('/').get(userAuthenticator, getAllJobs)

router.route('/getby/status').get(userAuthenticator, getByStatus)


module.exports = router
