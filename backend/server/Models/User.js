const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
  },

  // userType: {
  //   type: String,
  //   required: true,
  // },
});



module.exports = mongoose.model('User', UserSchema);
module.exports.UserSchema = UserSchema;
//module.exports = mongoose.model('User', UserSchema);
