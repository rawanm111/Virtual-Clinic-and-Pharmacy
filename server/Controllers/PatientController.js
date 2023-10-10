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
try {
    const updated = await patientModel.findByIdAndUpdate(
      req.params.userid,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};



exports.deletePatient = async (req, res) => {
try {
    await patientModel.findByIdAndDelete(req.params.userid);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};
  


