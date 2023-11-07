const mongoose = require('mongoose');
// const passwordValidator = function(password) {
//   // This regex will enforce at least one uppercase letter and at least 8 characters
//   return /^(?=.*[A-Z]).{8,}$/.test(password);
// };

const UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },
  
  password: {
    type: String,
    required: true,
    // validate: [
    //   passwordValidator,
    //   'Password should be at least 8 characters long and contain at least one uppercase letter.'
    // ],
  },

  role: {
    type: String,
    required: true,
  },
});



module.exports = mongoose.model('User', UserSchema);
module.exports.UserSchema = UserSchema;
//module.exports = mongoose.model('User', UserSchema);
