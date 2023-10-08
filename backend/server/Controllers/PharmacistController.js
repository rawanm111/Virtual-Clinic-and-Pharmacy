const pharmacistModel = require('../Models/pharmacists');
const { default: mongoose } = require('mongoose');

exports.createPharmacist = async(req,res) => {
   try {
    const newPharmacist = new pharmacistModel(req.body);
    const savedPharmacist = await newPharmacist.save();
    res.status(201).json(savedPharmacist);
  } catch (err) {
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


