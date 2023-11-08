const pharmacistModel = require('../Models/pharmacists');
const { default: mongoose } = require('mongoose');
const e = require('express');
const bcrypt = require('bcrypt');

exports.createPharmacist = async (req, res) => {
  try {
    const {
      username,
      fullName,
      email,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      password
    } = req.body;

    console.log('Received data:', req.body); // Log the data received

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newPharmacist = new pharmacistModel({
      username,
      fullName,
      email,
      dateOfBirth,
      hourlyRate,
      affiliation,
      educationalBackground,
      password: hashedPassword 
    });

    console.log('New Pharmacist:', newPharmacist); 

    const savedPharmacist = await newPharmacist.save();
    console.log('Saved Pharmacist:', savedPharmacist); 

    res.status(201).json(savedPharmacist);
  } catch (err) {
    console.error(err); 
    res.status(500).json(err);
  }
};


exports.getPharmacist = async (req, res) => {
    try {
      const pharmacist = await pharmacistModel.find();
      res.status(200).json(pharmacist);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  

exports.updatedPharmacist = async (req, res) => {
    try {
      const updated = await pharmacistModel.findByIdAndUpdate(
        req.params.userid,
        req.body,
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  
exports.deletePharmacist = async (req, res) => {
    try {
      await pharmacistModel.findByIdAndDelete(req.params.userid);
      res.status(204).end();
    } catch (err) {
      res.status(500).json(err);
    }
  };

exports.getPharmacistByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const patient = await pharmacistModel.findOne({ username: username });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePharmacistByUsername = async (req, res) => {
  const { username } = req.params; // Extract the username from the URL

  try {
    // Find the pharmacist by username
    const pharmacist = await pharmacistModel.findOne({ username: username });

    if (!pharmacist) {
      return res.status(404).json({ message: 'Pharmacist not found' });
    }

    // Update the pharmacist's information based on the request body
    pharmacist.set(req.body); // This updates only the fields that are present in the request body

    // Save the updated pharmacist document
    const updatedPharmacist = await pharmacist.save();

    res.status(200).json(updatedPharmacist);
  } catch (err) {
    res.status(500).json(err);
  }
};







