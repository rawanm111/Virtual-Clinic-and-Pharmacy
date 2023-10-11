const patientModel = require('../Models/patients');

exports.createPatient = async (req, res) => {
  try {
    const newPatient = new patientModel(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getPatient = async (req, res) => {
  try {
    const patient = await patientModel.find();
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePatient = async (req, res) => {
  const { username } = req.params;
  try {
    const updated = await patientModel.findOneAndUpdate(
      { username: username },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.deletePatient = async (req, res) => {
  const { username } = req.params;
  try {
    const deleted = await patientModel.findOneAndDelete({ username: username });
    if (!deleted) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getPatientByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const patient = await patientModel.findOne({ username: username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};


