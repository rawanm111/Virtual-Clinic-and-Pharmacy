const mongoose= require('mongoose');
const PatientPackages = require('../Models/PatientPackages');
const patients = require('../Models/patients');


// exports.createPatientPackages = async (req, res) => {
//   try {
//     const newPatientPackages = new PatientPackages(req.body);
//     const savedPatientPackages = await newPatientPackages.save();
//     res.status(201).json(savedPatientPackages);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// }
exports.createPatientPackages = async (req, res) => {
  try {
    const { patient, package } = req.body;

    // Check if a package for this patient already exists
    const existingPatientPackage = await PatientPackages.findOne({ patient: patient, package: package });

    if (existingPatientPackage) {
      // If a package already exists for this patient, return a message indicating so
      return res.status(409).json({ message: "Patient package already exists for this patient." });
    }
     // If no existing package found, create a new one
    const newPatientPackages = new PatientPackages(req.body);
    const savedPatientPackages = await newPatientPackages.save();
    res.status(201).json(savedPatientPackages);
  } catch (err) {
    res.status(500).json(err);
  }
}


exports.getAllPatientPackages = async (req, res) => {
    try {
        const allPatientPackages = await PatientPackages.find();
        res.status(200).json(allPatientPackages);
    } catch (err) {
        res.status(500).json(err);
    }
    }
    
    exports.getPatientPackagesById = async (req, res) => {
      try {
          const patientId = req.params.patientId; 
          const patientPackages = await PatientPackages.find({ patient: patientId });
          res.status(200).json(patientPackages);
      } catch (err) {
          res.status(500).json(err);
      }
  }

  exports.cancelAllPatientPackages = async (req, res) => {
    try {
        const patientId = req.params.patientId; // using patient ID from the URL parameter
        const canceledStatus = 'canceled'; // the status we want to set

        // Update the status of all packages for this patient to 'canceled'
        const updatedPatientPackages = await mongoose.model('PatientPackages').updateMany(
            { patient: patientId }, // filter to match documents related to the patient
            { status: canceledStatus }, // update operation to set status to 'canceled'
            { new: true } // this option is not used with updateMany, but you can use { multi: true }
        );

        // Check if any documents were updated
        res.status(200).json({ message: 'Patient packages canceled successfully', data: updatedPatientPackages });
    } catch (err) {
        res.status(500).json({ message: 'Error updating patient packages', error: err });
    }
}







  

  