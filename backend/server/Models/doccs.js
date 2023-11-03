
// doctor.model.js
const mongoose = require('mongoose');
const User = require('../Models/User'); // Import User model and schema

const DoctorSchema = new mongoose.Schema();
DoctorSchema.add(User.UserSchema); // Adding UserSchema to DoctorSchema
DoctorSchema.add({
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

module.exports = mongoose.model('Doctor', DoctorSchema);































// const mongoose = require('mongoose');
// const doctors = new mongoose.Schema({
  
// username: {
//   type: String,
//   required: true,
// },

// fullName: {
//   type: String,
//   required: true,
// },
// email: {
//   type: String,
//   required: true,
// },
// password: {
//   type: String,
//   required: true,
// },

// hourlyRate: {
//   type: Number,
//   required: true,
// }, 
// dateOfBirth: {
//     type: String,
//     required: true
//   },
// affiliation: {
//   type: String,
//   required: true,
// },
// educationalBackground: {
//   type: String,
//   required: true,
// },
// speciality: {
//   type: String,
//   required: true,
// },


// });

// module.exports = mongoose.model('doctors', doctors);