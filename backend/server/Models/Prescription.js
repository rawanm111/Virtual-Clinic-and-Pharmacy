const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = new mongoose.Schema(
  {
    Date: {
      type: String,
      required: true,
    },
    Patient: {
        type: Schema.Types.ObjectId,
        ref: 'patients',
        required: false,
    },
    Doctor: {
        type: Schema.Types.ObjectId,
        ref: 'doctors',
        required: true,
    },
    filled: {
      type: Boolean,
      required: true,
    },
    medicines: [
      {
        medicine: {
          type: Schema.Types.ObjectId,
          ref: 'meds',
          required: true,
        },
        dosage: {
          type: String,
          required: true,
        },
      }
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Prescription', PrescriptionSchema);