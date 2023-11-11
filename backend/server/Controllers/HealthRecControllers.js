const HealthRecords = require('../Models/HealthRecords.js');
const appointement = require('../Models/appointements');
const patients = require('../Models/patients');



exports.createHealthRecords = async (req, res) => {
  try {
    const { id } = req.params; // Get the patient's ID from the URL parameters
  

    const newRecord = new HealthRecords(req.body);
    
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(500).json({ err});
  }
};


// Retrieve all Health Records
exports.getAllHealthRecords = async (req, res) => {
  try {
    const records = await HealthRecords.find();
    res.status(200).json(records);
  } catch (err) {
    console.error('Error fetching all health records:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Retrieve Health Records for a specific patient
exports.getallHealthRecordsPatient = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const id = new  mongoose.Types.ObjectId(req.params.id);


    console.log('Patient ID:', id);
    
    const patientHealthRecords = await HealthRecords.find({ patient: id });
    console.log('Patient Health Records:', patientHealthRecords);
    
    if (patientHealthRecords.length === 0) {
      const message = `No health records found for patient with ID: ${id}`;
      console.log(message);
      return res.status(404).json({ message });
    }
     
    res.status(200).json(patientHealthRecords);
  } catch (err) {
    console.error("Error fetching health records:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update a Health Record
exports.updateHealthRecords = async (req, res) => {
  try {
    const updatedRecords = await HealthRecords.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecords);
  } catch (err) {
    console.error('Error updating health record:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Delete a Health Record
exports.deleteHealthRecords = async (req, res) => {
  try {
    await HealthRecords.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting health record:', err);
    res.status(500).json({ message: 'Internal server error.' });
  }
};