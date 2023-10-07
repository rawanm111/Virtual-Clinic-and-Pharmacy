const mongoose = require('mongoose');
const doctors = new mongoose.Schema({
 username: {
    type: String,
    required: true,
  },
  name: {
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
  
  hourly_rate: {
    type: Number,
    required: true,
  },
  educational_bg: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model('doctors', doctors);