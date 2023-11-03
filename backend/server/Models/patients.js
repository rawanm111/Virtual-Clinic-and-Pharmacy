const mongoose = require('mongoose');
<<<<<<< HEAD
const User = require('../Models/User'); // Import User model and schema

const PatientSchema = new mongoose.Schema();
PatientSchema.add(User.UserSchema); // Adding UserSchema to PatientSchema
PatientSchema.add({
=======
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
>>>>>>> origin/marwan
  fullName: {
    type: String,
    required: true,
  },
  email: {
<<<<<<< HEAD
    type: String,
=======
    type:String,
>>>>>>> origin/marwan
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
<<<<<<< HEAD
});

module.exports = mongoose.model('Patient', PatientSchema);



































// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const patientSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type:String,
//     required: true,
//   },
//   dateOfBirth: {
//     type: String,
//     required: true,
//   },
//   gender: {
//     type: String,
//     required: true,
//   },
//   mobileNumber: {
//     type: String,
//     required: true,
//   },
//   emergencyContactFullName: {
//     type: String,
//     required: true,
//   },
//   emergencyContactMobileNumber: {
//     type: String,
//     required: true,
//   },
//   emergencyContactRelationToPatient: {
//     type: String,
//     required: true,
//   },
  
// });

// module.exports = mongoose.model('patients', patientSchema);
=======
  
});

module.exports = mongoose.model('patients', patientSchema);
>>>>>>> origin/marwan
