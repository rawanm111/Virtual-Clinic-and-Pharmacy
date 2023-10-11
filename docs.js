const mongoose = require('mongoose');
const doctors = new mongoose.Schema({
  
username: {
  type: String,
  required: true,
},

fullName: {
  type: String,
  required: true,
},
email: {
  type: String,
  required: true,
},
password: {
  type: String,
  required: true,
},

hourlyRate: {
  type: Number,
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
dateOfBirth: {
  type: String,
  required: true,
},


});

module.exports = mongoose.model('doctors', doctors);