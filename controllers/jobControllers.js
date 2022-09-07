const express = require('express')

const getSingleJob = async(req, res) => {
    res.json(`Here is the single job you requested for`)
}


const getAllJobs = async(req, res) => {
    res.json(`Here is a list of all the job you have in your datbase`)
}

const createJob = async(req, res) => {
    res.json(`Job successfully created ......`)
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
