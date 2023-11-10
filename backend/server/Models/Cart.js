const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  pataddress: {
    type: String,
    default: 'no add yet',
  },
  patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: './patients', // Reference to the patient model
      required: true,
    },
    medications: [
      {
        medicationId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'meds', // Reference to the medication model
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1, // You can set an initial quantity
        },
      },
    ],
    
    
  });
  
  module.exports = mongoose.model('carts', cartSchema);
  