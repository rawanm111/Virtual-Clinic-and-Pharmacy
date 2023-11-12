const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: './patients', // Reference to the patient model
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: './Cart', // Reference to the cart model
    required: true,
  },
  items: [
    {
      medicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: './meds', // Reference to the medication model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      name:{
        type: String,
        required:true,
      }
    },
  ],
  address: {
    type: String,
    required: true,
  },
  // Add any other relevant fields for orders
  status: {
    type: String,
    enum: ['pending', 'delivered', 'canceled'],
    default: 'pending', // Default status is pending
  },
});

module.exports = mongoose.model('orders', orderSchema);
