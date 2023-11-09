const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nationalid: {
    type: String,
    required: true,
  },
  relationtopatient: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('FamilyMember', FamilyMemberSchema);
