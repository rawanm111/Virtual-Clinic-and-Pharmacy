const mongoose = require('mongoose');

const walletSchemaPharmacist = new mongoose.Schema({
  pharmacist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pharmacist',
    required: true,
  },
  balance: {
    type: Number,
    default: 1000,
  },
});

const walletPharmacist = mongoose.model('walletPharmacist', walletSchemaPharmacist);

module.exports = walletPharmacist;
