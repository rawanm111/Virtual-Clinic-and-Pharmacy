const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients', // Reference to the Patient model
  },
  documents: [
    {
      filename: String, // File name
      data: mongoose.Schema.Types.Mixed, // Store file data
      contentType: String, // Add this line to store content type
    },
  ],
});

module.exports = mongoose.model('medicalHistory', medicalHistorySchema);