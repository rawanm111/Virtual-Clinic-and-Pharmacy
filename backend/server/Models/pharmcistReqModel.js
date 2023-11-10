const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistReqSchema = new Schema({
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
  dateOfBirth: {
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
  nationalIdFile: {
    type: mongoose.Schema.Types.Mixed,
  },
  pharmacyDegreeFile: {
    type: mongoose.Schema.Types.Mixed,
  },
  workingLicenseFile: {
    type: mongoose.Schema.Types.Mixed,
  },
});

module.exports = mongoose.model('PharmacistReq', pharmacistReqSchema);
