const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientPackagesSchema = new mongoose.Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'patients',
    required: true,
  },
  package: {
    type: Schema.Types.ObjectId,
    ref: 'HealthPackage',
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  startdate: {
    type: String,
    required: true,
  },
  enddate: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('PatientPackages', PatientPackagesSchema);
