<<<<<<< HEAD


const mongoose = require('mongoose');
const User = require('../Models/User');
const AdminSchema = new mongoose.Schema();
AdminSchema.add(User.UserSchema); 

module.exports = mongoose.model('Admin', AdminSchema);
=======
const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
   
    
  });
  
  module.exports = mongoose.model('Admin',adminSchema);
>>>>>>> origin/marwan
