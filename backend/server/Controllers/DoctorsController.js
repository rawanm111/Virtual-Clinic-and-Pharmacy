const doctors = require('../Models/doccs');
const walletModel = require('../Models/walletDoc'); // Import the wallet model

exports.createNewDoc = async (req, res) => {
  try {
    // Create a new patient
    const newDoc = new doctors(req.body);
    const savedDoc = await newDoc.save();

    // Create a wallet for the new patient
    const newWallet = new walletModel({
      doctor: savedDoc._id, 
      balance: 0, // You can set an initial balance if needed
    });

    // Save the wallet
    const savedWallet = await newWallet.save();

    // Update the patient with the wallet information
    savedDoc.walletDoc = savedWallet._id;
    await savedDoc.save();

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
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};