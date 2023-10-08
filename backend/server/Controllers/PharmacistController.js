const pharmacistModel = require('../Models/pharmacists.js');
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
  




// const updatedPharmacist = async (req, res) => {
   
//    const phamacistid = req.params.pharmacistid;
//   const updatedPharmacistData = req.body;
//   User.findByIdAndUpdate(Name, updatedPatientData, { pharmacistid: phamacistid })
//   .then(updatedPharmacist => {
//     res.json(updatedPharmacist);
//   })
//   .catch(error => {
//    res.status(400).json({ error:error.message });
//  });
// }


  
exports.deletePharmacist = async (req, res) => {
    try {
      await pharmacistModel.findByIdAndDelete(req.params.userid);
      res.status(204).end();
    } catch (err) {
      res.status(500).json(err);
    }
  };


// module.exports = {updatedPharmacist};