const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: './patients',
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // Add other address-related fields as needed
});

module.exports = mongoose.model('Address', addressSchema);