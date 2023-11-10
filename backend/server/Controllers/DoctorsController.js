const doctors = require('../Models/doccs');

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
      await doctors.findByIdAndDelete(req.params.userid);
      res.status(204).end();
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.getDoctorByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const doctor = await doctors.findOne({ username: username });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(doctor);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.updateDoctorByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const updated = await doctors.findOneAndUpdate(
        { username: username },
        req.body,
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.deleteDoctorByUsername = async (req, res) => {
    const { username } = req.params;
    try {
      const deleted = await doctors.findOneAndDelete({ username: username });
      if (!deleted) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).json(err);
    }
  };


exports.getDoctorByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const patient = await doctors.findOne({ username: username });
    if (!patient) {
      return res.status(404).json({ message: 'doc not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getDoctorById = async (req, res) => {
  const { id } = req.params; 
  try {
    const doctor = await doctors.findById(id); 
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json(err);
  }
};