const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
