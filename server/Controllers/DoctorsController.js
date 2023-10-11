const doctors = require('../Models/docs');

exports.createNewDoc = async (req, res) => {
  try {
    const newDoc = new doctors(req.body);
    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctor = await doctors.find();
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateDoc = async (req, res) => {
  try {
      const updated = await doctors.findOneAndUpdate(
        req.params.username,
        req.body,
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.deleteDoc = async (req, res) => {
    try {
      const deletedDoctor = await doctors.findOneAndDelete({ username: req.params.username });
      
      
  
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  