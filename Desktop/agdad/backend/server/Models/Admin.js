

const mongoose = require('mongoose');
const User = require('../Models/User');
const AdminSchema = new mongoose.Schema();
AdminSchema.add(User.UserSchema); 

module.exports = mongoose.model('Admin', AdminSchema);
