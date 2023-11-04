const pharmcistReqModel = require('../Models/pharmcistReqModel')
const PharmcistReq = require('../Models/pharmcistReqModel')
const mongoose = require('mongoose')






//submit a new pahrmcist req
const submitPharmcistReq = async (req , res)=>{
    const{username,name,email,password,birthdate,hourlyRate,hospital,educationalBackground} = req.body

    //add req to DB
    try{
        const pharmcistReq = await PharmcistReq.create({username,name,email,password,birthdate,hourlyRate,hospital,educationalBackground})
        res.status(200).json(pharmcistReq)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
    //res.json({mssg:'add a new request'})
}

//get all pharmcist Req
const getAllReq = async(req , res )=>{
    
    const allRequests = await pharmcistReqModel.find({}).sort({createdAt: -1})
    res.status(200).json(allRequests)
}

//get a single req
const getReq = async (req, res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'no such request'})
    }
    const pharmcistReq = await pharmcistReqModel.findById(id)
    if(!pharmcistReq){
        return res.status(400).json({error:'no such request'})
    }
    res.status(200).json(pharmcistReq)
}


module.exports = {
    submitPharmcistReq, getAllReq,getReq
}