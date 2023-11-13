const mongoose= require('mongoose');
const PatientPackages = require('../Models/PatientPackages');
const patients = require('../Models/patients');

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
    const patientId = req.params.id; // Assuming the patient ID is passed in the request params

    const patientPackages = await PatientPackages.find({ patient: patientId })
      .populate('package')
      .select('package status startdate enddate');

    // Extracting the required fields from the populated 'package' field
    const simplifiedPackages = patientPackages.map((package) => ({
      package: package.package.name, 
      status: package.status,
      startdate: package.startdate,
      enddate: package.enddate,
    }));

    res.status(200).json(simplifiedPackages);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

    
    exports.getPatientPackagesById = async (req, res) => {
      try {
          const patientId = req.params.patientId; 
          const patientPackages = await PatientPackages.find({ patient: patientId });
          res.status(200).json(patientPackages);
      } catch (err) {
          res.status(500).json(err);
      }
  }

const HealthPackage = require('../Models/HealthPackage');

exports.cancelPatientPackage = async (req, res) => {
  try {
    const { patientId, packageName } = req.params;

    // Replace the first occurrence of hyphen with a space
    const packageNameNew = packageName.replace('-', ' ');

    // Find the HealthPackage by name
    const healthPackage = await HealthPackage.findOne({ name: packageNameNew });

    if (!healthPackage) {
      return res.status(404).json({ message: 'HealthPackage not found.' });
    }

    // Find the corresponding entry in PatientPackages using the HealthPackage ID
    const existingPackage = await PatientPackages.findOne({
      patient: patientId,
      package: healthPackage._id,
    });

    if (!existingPackage) {
      return res.status(404).json({ message: 'Package not found.' });
    }

    // Update the package status to "Cancelled"
    const updatedPackage = await PatientPackages.findByIdAndUpdate(
      existingPackage._id,
      { $set: { status: 'Cancelled' } },
      { new: true }
    );

    res.status(200).json(updatedPackage);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

  

  
  exports.getPatientHealthPackage = async (req, res) => {
    try {
      const { patientId } = req.params;
      const healthPackage = await PatientPackages.findOne({
        patient: patientId,
        status: 'Subscribed',
      }).populate('package');
  
      res.status(200).json(healthPackage);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  





  

  