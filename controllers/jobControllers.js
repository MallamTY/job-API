const express = require('express')
const Job = require('../models/jobModel')
const {StatusCodes} = require('http-status-codes')
const BadRequest = require('../error/badRequest')

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


const getAllJobs = async(req, res) => {
    const {user: {username}} = req
    

    try {
        var job = await Job.find({createdBy: username})
        

        if (!job) {
            throw new BadRequest(`You currently do not have any job`)
        }
        res.status(StatusCodes.OK).json({
            nbHit: job.length.toExponential,
            status: `Successful ...`,
            message: `Search successful`,
            job, 
            nbHit: job.length
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

            const job = await Job.findOneAndUpdate({_id: id, createdBy: username}, req.body, {new: true}).select('-__v')

            if (!job) {
                throw new BadRequest(` Unable to complete operation, please try again later`)
            }
        
            res.status(StatusCodes.OK).json({
                status: `Success ....`,
                message: `Job successfully created ........`,
                job
            })
        } catch (error) {
            error.message
        }
       

    
}

const deleteJob = async(req, res) => {
    res.json(`Job deleted successfully`)
}


module.exports = {
    getSingleJob,
    getAllJobs,
    createJob,
    updateJob,
    deleteJob
}
