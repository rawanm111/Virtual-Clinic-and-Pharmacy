const drReqModel = require('../Models/drReqModel')
const DrReq = require('../Models/drReqModel')
const mongoose = require('mongoose')

//submit a new dr req
const submitDrReq = async (req , res)=>{
    const{username,name,email,password,birthdate,hourlyRate,hospital,educationalBackground} = req.body

    try {
        const newDoc = new DrReq(req.body);
        const savedDoc = await newDoc.save();
        res.status(201).json(savedDoc);
      } catch (err) {
        res.status(500).json(err);
      }
}

//get all dr Req
const getAllReq = async(req , res )=>{
    const allRequests = await drReqModel.find({}).sort({createdAt: -1})
    res.status(200).json(allRequests)
}

//get a single req
const getReq = async (req, res)=>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: 'no such request'})
    }
    const drReq = await drReqModel.findById(id)
    if(!drReq){
        return res.status(400).json({error:'no such request'})
    }
    res.status(200).json(drReq)
}


module.exports = {
    submitDrReq, getAllReq,getReq
}