
// doctor.model.js
const mongoose = require('mongoose');
const User = require('../Models/User');

const DoctorSchema = new mongoose.Schema();
DoctorSchema.add(User.UserSchema);
//DoctorSchema.path('role').default('doctor');
DoctorSchema.add({
  role: { 
    type: String,
    default: 'doctor',
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hourlyRate: {
    type: Number,
    required: true,
  }, 
  dateOfBirth: {
    type: String,
    required: true,
  },
  affiliation: {
    type: String,
    required: true,
  },
  educationalBackground: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  
});
//DoctorSchema.path('role').default('doctor');
module.exports = mongoose.model('doctors', DoctorSchema);

