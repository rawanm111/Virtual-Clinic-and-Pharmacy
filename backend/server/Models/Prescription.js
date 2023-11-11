const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = new mongoose.Schema(
  {
    Date: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    PatientID: {
        type: Schema.Types.ObjectId,
        ref: 'patients',
        required: false,
    },
    DocID: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
    },
    filled: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Prescription', PrescriptionSchema);
