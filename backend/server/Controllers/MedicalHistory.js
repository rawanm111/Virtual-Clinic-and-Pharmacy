const MedicalHistory = require('../Models/MedicalHistory');

// Create a new medical history record
exports.createMedicalHistory = async (req, res) => {
    try {
      const newRecords = new MedicalHistory(req.body);
      const savedRecords = await newRecords.save();
      res.status(201).json(savedRecords);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  exports.deleteMedicalHistory = async (req, res) => {
    try {
      const patientId = req.params.patientId; // Assuming 'patientId' is the parameter in the route
  
      // Using Mongoose's findOneAndDelete to delete a medical history record by patientId
      const result = await MedicalHistory.findOneAndDelete({ patientId });
  
      if (!result) {
        // If no matching record was found
        res.status(404).json({ message: 'Medical history not found' });
      } else {
        // Sending a 204 No Content status to indicate successful deletion
        res.status(204).end();
      }
    } catch (err) {
      // Handling errors and sending a 500 Internal Server Error along with the error details in JSON format
      res.status(500).json(err);
    }
  };
  

  exports.getAllMedicalHistory = async (req, res) => {
    try {
      const Records = await MedicalHistory.find();
      res.status(200).json(Records);
    } catch (err) {
      res.status(500).json(err);
    }
  };