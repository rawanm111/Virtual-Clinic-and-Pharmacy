const Prescription = require('../Models/Prescription');

// Create a new Prescription
exports.createPrescription = async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    const saved = await newPrescription.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
};

const doctors = require('../Models/doccs');

exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptionData = await Prescription.find().populate('DocID', 'fullName').populate('PatientID', 'patientName');
    res.status(200).json(prescriptionData);
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
    const Prescriptions = await Prescription.find({ PatientID: req.params.id }).populate('DocID', 'fullName');
    res.status(200).json(Prescriptions);
  } catch (err) {
    res.status(500).json(err);
  }
};
