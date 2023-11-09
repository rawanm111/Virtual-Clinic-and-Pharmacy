const drReqModel = require('../Models/drReqModel')
const DrReq = require('../Models/drReqModel')
const mongoose = require('mongoose')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const submitDrReq = async (req, res) => {
    try {
      const {
        username,
        fullName,
        email,
        password,
        hourlyRate,
        dateOfBirth,
        affiliation,
        educationalBackground,
        speciality,
      } = req.body;
  
      // You can use req.files to access the uploaded files.
      const nationalIdFile = req.files.nationalIdFile;
      const medicalLicenseFile = req.files.medicalLicenseFile;
      const medicalDegreeFile = req.files.medicalDegreeFile;
  
      // Create a new instance of the doctor registration model
      const newDoctorRequest = new drReqModel({
        username,
        fullName,
        email,
        password,
        hourlyRate,
        dateOfBirth,
        affiliation,
        educationalBackground,
        speciality,
        nationalIdFile,
        medicalLicenseFile,
        medicalDegreeFile,
      });
      
      // Save the doctor registration request to the database
      await newDoctorRequest.save();

      res.status(201).json({ message: 'Doctor registration request submitted successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  };

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