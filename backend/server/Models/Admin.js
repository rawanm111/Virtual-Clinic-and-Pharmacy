

const mongoose = require('mongoose');
const User = require('../Models/User');
const AdminSchema = new mongoose.Schema();
AdminSchema.add(User.UserSchema);
AdminSchema.add({
role: { 
  type: String,
  default: 'admin',
},
});
  

module.exports = mongoose.model('Admin', AdminSchema);
