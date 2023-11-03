const Prescription = require('../Models/Prescription');

// Create a new Prescription 
exports.createPrescription = async (req, res) => {
  try {
    const newPrescription = await Prescription.create(req.body);
    res.status(201).json(newPrescription);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Retrieve all Prescription 
exports.getAllPrescriptions = async (req, res) => {
  try {
    const allPrescriptions = await Prescription.find();
    res.status(200).json(allPrescriptions);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a Prescription 
exports.updatePrescription = async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPrescription);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a Prescription 
exports.deletePrescription = async (req, res) => {
  try {
    await Prescription.findByIdAndRemove(req.params.id);
    res.status(200).json('The Prescription has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
};

// Find Prescription by patientID
exports.getPrescriptionwithPatientID = async (req, res) => {
  try {
    const Prescriptions= await Prescription.find({PatientID: req.params.patientID}).exec();
    res.status(200).json(Prescriptions);
  } catch (err) {
    res.status(500).json(err);
  }
} 


