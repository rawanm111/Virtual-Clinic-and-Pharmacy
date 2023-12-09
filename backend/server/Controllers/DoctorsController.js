const doctors = require('../Models/doccs');
const walletModel = require('../Models/walletDoc');
const EmploymentContract = require('../Models/EmploymentContract'); 
const bcrypt = require('bcrypt');
const prescriptions = require('../Models/Prescription');

exports.createDoc = async (req, res) => {
  try {
    const {
      username,
      fullName,
      email,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      speciality,
      password,
    } = req.body;
    console.log('Received data:', req.body);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDoctor = new doctors({
      username,
      fullName,
      email,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      speciality,
      password: hashedPassword,
    });

    console.log('New Doctor:', newDoctor);

    const newWallet = new walletModel({
      doctor: newDoctor._id,
      balance: 0,
    });

    // Save the wallet
    const savedWallet = await newWallet.save();

    // Update the doctor with the wallet information
    newDoctor.wallet = savedWallet._id;

    // Save the doctor
    const savedDoctor = await newDoctor.save();

    // Create an employment contract for the doctor
    const newContract = new EmploymentContract({
      employeeName: fullName,
      employeeId: newDoctor._id,
      jobTitle: 'Doctor',
      startDate: new Date(),
      salary: hourlyRate,
      status: 'Inactive',  // Set the default status to "Inactive"
    });

    // Save the employment contract
    const savedContract = await newContract.save();

    console.log('Saved Doctor:', savedDoctor);
    console.log('Saved Employment Contract:', savedContract);

    res.status(201).json(savedDoctor);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

// Rest of the code remains the same...


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

//view docotor patient prescriptions
exports.getDoctorPrescriptions = async (req, res) => {
  const { id } = req.params; 
  try {
    //find the prescriptions that the doctor wrote
    const prescriptionsToBeSent = await prescriptions.find(
      {
        DocID: id 
      }
      );
    if (!prescriptions) {
      return res.status(404).json({ message: 'no prescriptions found for this dr' });
    }
    res.status(200).json(prescriptionsToBeSent);
  } catch (err) {
    res.status(500).json(err);
  }
};

// add a prescription to a patient
exports.addPrescription = async (req, res) => {
  const { id } = req.params; 
  try {
    const newPrescription = new prescriptions({
      Date: req.body.Date,
      details: req.body.details,
      PatientID: req.body.PatientID,
      DocID: id,
      filled: req.body.filled,
    });
    const savedPrescription = await newPrescription.save();
    res.status(200).json(savedPrescription);
  } catch (err) {
    res.status(500).json(err);
  }
};