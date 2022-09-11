const Job = require('../models/jobModel')
const {StatusCodes} = require('http-status-codes')
const BadRequest = require('../error/badRequest')
const NotFoundError = require('../error/notFoundError')

const getSingleJob = async(req, res) => {
    const {user: {username}, params: {id}} = req
    console.log(username);

    try {
        const job = await Job.findOne({_id: id, createdBy: username})
        
        if (!job) {
            throw new BadRequest(`No job with the id ${id}`)
        }
        res.status(StatusCodes.OK).json({
            status: `Successful ...`,
            message: `Search successful`,
            job
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

const getByStatus = async (req, res) => {
    const {query: {status}, user: {username}} = req
    const queryObject = {}
    

    

   try {
    if(status) {
        queryObject.status = {$regex: status, $options: 'i'}
        var user = queryObject.createdBy = username;
    }
     console.log(queryObject);
    var job = await Job.find(queryObject)

    if (!job) {
        throw new BadRequest(`Invalid request`)
    }
    if (job.length == 0) {
        throw new NotFoundError(`You currently don't have any ${status} job`)
    }

    res.status(StatusCodes.OK).json({
        status: `Successful ...`,
        message: `Search successful`,
        nbHit: job.length,
        job
    })
   
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
    
}




const getAllJobs = async(req, res) => {
    const {user: {username}} = req

    try {
        var job = await Job.find({createdBy: username})
        

        if (!job) {
            throw new BadRequest(`You currently do not have any job`)
        }
        res.status(StatusCodes.OK).json({
            nbHit: job.length,
            status: `Successful ...`,
            message: `Search successful`,
            job
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
}

const createJob = async(req, res) => {
    const { user: {username} } = req
    try {
        
        const job = await Job.create({...req.body, createdBy: username})
        
        if (!job) {
            throw new BadRequest(`You currently do not have any job`)
        }
        res.status(StatusCodes.OK).json({
            status: `Success ....`,
            message: `Job successfully created ........`,
            job
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
    
}

const updateJob = async(req, res) => {
    const {user: {username}, 
            params: {id},
           
        } = req
        console.log((username));

        if (!id) {
            throw new BadRequest(`Invalid id supplied`) 
        }
        
        try {

            const job = await Job.findOneAndUpdate({_id: id, createdBy: username}, req.body, {new: true})

            if (!job) {
                throw new BadRequest(` Unable to complete operation, please try again later`)
            }
        
            res.status(StatusCodes.OK).json({
                status: `Success ....`,
                message: `Job successfully created ........`,
                job
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
        }
       

    
}

const deleteJob = async(req, res) => {
    const {user: {username}, params: {id}} = req
    if (!id) {
        throw new BadRequest(`Invalid id supplied`)   
    }

   try {

    const deletedJob = await Job.findByIdAndRemove({_id: id, createdBy: username})

    if (!deletedJob) {
        throw new NotFoundError(`Job with not found ${id}`)
    }
    res.status(StatusCodes.OK).json({
        status: `Success ....`,
        message: `Job successfully deleted ........`,
        deletedJob
    })
   } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
   }
    
}



module.exports = {
    getSingleJob,
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
    getByStatus
}
