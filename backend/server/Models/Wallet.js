// Wallet model
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient', // Reference to the Patient model
    required: true,
  },
  balance: {
    type: Number,
    default: 500,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Meds', // Reference to the Meds model
    },
  ],
});

const Wallet = mongoose.model('Wallet', walletSchema);

module.exports = Wallet;
