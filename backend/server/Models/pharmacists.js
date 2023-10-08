const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
  
  username: {
    type: String,
    required: true
  },
  nationalid: {
    type: Number,
    required: true,
  },
  education_background: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('pharmacists', pharmacistSchema);
