const mongoose = require('mongoose');
const User = require('../Models/User'); // Import User model and schema

const patientSchema = new mongoose.Schema();
patientSchema.add(User.UserSchema); // Adding UserSchema to PatientSchema
patientSchema.add({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emergencyContactFullName: {
    type: String,
    required: true,
  },
  emergencyContactMobileNumber: {
    type: String,
    required: true,
  },
  emergencyContactRelationToPatient: {
    type: String,
    required: true,
  },
  familyMembers: [
    {
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patients', // Reference to the Patient model
      },
      relation: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('patients', patientSchema);
