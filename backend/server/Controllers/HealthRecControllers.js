const HealthRecords = require('../Models/HealthRecords.js');

// Create a new Health Records
exports.createHealthRecords = async (req, res) => {
  try {
    const newRecords = new HealthRecords(req.body);
    const savedRecords = await newRecords.save();
    res.status(201).json(savedRecords);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Retrieve all Health Records
exports.getAllHealthRecords = async (req, res) => {
  try {
    const Records = await HealthRecords.find();
    res.status(200).json(Records);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a Health Records
exports.updateHealthRecords = async (req, res) => {
  try {
    const updatedRecords = await HealthRecords.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecords);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a Health Records
exports.deleteHealthRecords = async (req, res) => {
  try {
    await HealthRecords.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};