const pharmcistReqModel = require('../Models/pharmcistReqModel')
const PharmcistReq = require('../Models/pharmcistReqModel')
const mongoose = require('mongoose')

//submit a new pahrmcist req
const submitPharmcistReq = async (req , res)=>{
    try {
        const newPharmacist = new pharmcistReqModel(req.body);
        const savedPharmacist = await newPharmacist.save();
        res.status(201).json(savedPharmacist);
      } catch (err) {
        res.status(500).json(err);
      }
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