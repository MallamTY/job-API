const express = require('express')
const Job = require('../models/jobModel')
const {StatusCodes} = require('http-status-codes')
const BadRequest = require('../error/badRequest')

const getSingleJob = async(req, res) => {
    res.json(`Here is the single job you requested for`)
}


const getAllJobs = async(req, res) => {
    res.json(`Here is a list of all the job you have in your datbase`)
}

const createJob = async(req, res) => {
    const { user: {userId} } = req
    try {
        
        const job = await Job.create({...req.body, createdBy: userId})
        
        res.status(StatusCodes.CREATED).json({
            status: `Success ....`,
            message: `Job successfully created ........`,
            job
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message)
    }
    
}

const updateJob = async(req, res) => {
    res.json(`Update successful .......`)
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
