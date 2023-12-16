const mongoose = require('mongoose');
const User = require('../Models/User'); // Import User model and schema



const PharmacistSchema = new mongoose.Schema();
PharmacistSchema.add(User.UserSchema); // Adding UserSchema to PharmacistSchema
PharmacistSchema.add({
  role: { 
    type: String,
    default: 'pharmacist',
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
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
});

module.exports = mongoose.model('Pharmacist', PharmacistSchema);
