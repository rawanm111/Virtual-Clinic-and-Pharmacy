const mongoose = require('mongoose');

const medsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sales: {
    type: Number,
    required: true,
  },
  availableQuantity: {
    type: Number,
    required: true,
  },
  medicalUse: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model('meds',medsSchema);