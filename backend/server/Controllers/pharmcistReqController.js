const PharmacistReq = require('../Models/pharmcistReqModel'); // Ensure the correct model name is used
const mongoose = require('mongoose');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller to submit a pharmacist registration request
const submitPharmacistReq = async (req, res) => {
  try {
    const {
      username,
      fullName,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
    } = req.body;
    const nationalIdFile = req.files.nationalIdFile;
    const pharmacyDegreeFile = req.files.pharmacyDegreeFile;
    const workingLicenseFile = req.files.workingLicenseFile;
    const newPharmacistRequest = new PharmacistReq({
      username,
      fullName,
      email,
      password,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      nationalIdFile,
      pharmacyDegreeFile,
      workingLicenseFile,
    });
    console.log("heyy");
    await newPharmacistRequest.save();

    res.status(201).json({ message: 'Pharmacist registration request submitted successfully' });
  } catch (error) {
    console.log(error);
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};

// Module exports
module.exports = {
  submitPharmacistReq,
};

// Get all pharmacist requests
const getAllReq = async (req, res) => {
  const allRequests = await PharmacistReq.find({}).sort({ createdAt: -1 });
  res.status(200).json(allRequests);
};

// Get a single request
const getReq = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such request' });
  }
  const pharmacistReq = await PharmacistReq.findById(id);
  if (!pharmacistReq) {
    return res.status(400).json({ error: 'No such request' });
  }
  res.status(200).json(pharmacistReq);
};

// Module exports
module.exports = {
  submitPharmacistReq,
  getAllReq,
  getReq,
};
