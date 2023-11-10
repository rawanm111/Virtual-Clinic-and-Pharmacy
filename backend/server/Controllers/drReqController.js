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
const getReq = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such request' });
  }

  const drReq = await drReqModel.findById(id);

  if (!drReq) {
    return res.status(400).json({ error: 'No such request' });
  }

  // Convert file data to base64 string
  const nationalIdFileData = drReq.nationalIdFile && drReq.nationalIdFile.toString('base64');
  const medicalLicenseFileData = drReq.medicalLicenseFile && drReq.medicalLicenseFile.toString('base64');
  const medicalDegreeFileData = drReq.medicalDegreeFile && drReq.medicalDegreeFile.toString('base64');

  // Include file data in the response
  const responseData = {
    ...drReq.toJSON(),
    nationalIdFileData,
    medicalLicenseFileData,
    medicalDegreeFileData,
  };

  res.status(200).json(responseData);
};

const getAllReq = async (req, res) => {
  try {
    const allRequests = await drReqModel.find({}).sort({ createdAt: -1 });

    // Convert file data to base64 string for each request
    const requestsWithData = allRequests.map((drReq) => ({
      ...drReq.toJSON(),
      nationalIdFileData: drReq.nationalIdFile && drReq.nationalIdFile.toString('base64'),
      medicalLicenseFileData: drReq.medicalLicenseFile && drReq.medicalLicenseFile.toString('base64'),
      medicalDegreeFileData: drReq.medicalDegreeFile && drReq.medicalDegreeFile.toString('base64'),
    }));

    res.status(200).json(requestsWithData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deletereqs = async (req, res) => {
  try {
    await PharmacistReq.findByIdAndDelete(req.params.id);  // Fixed the model reference
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};


module.exports = {
  submitDrReq, getAllReq,getReq,deletereqs
}