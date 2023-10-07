const doctors = require('../Models/doctors');

// Create a new Health Package
exports.createNewDoc = async (req, res) => {
  try {
    const newDoc = new doctors(req.body);
    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Retrieve all Health Packages
exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await doctors.find();
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
};


// Delete a Health Package
exports.deleteDoc = async (req, res) => {
  try {
    await doctors.findByIdAndDelete(req.params.username);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};