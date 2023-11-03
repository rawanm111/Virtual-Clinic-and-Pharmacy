const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

<<<<<<< HEAD
  username: {
    type: String,
    required: true,
  },
  
=======
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
>>>>>>> origin/marwan
  password: {
    type: String,
    required: true,
  },
<<<<<<< HEAD

  // userType: {
  //   type: String,
  //   required: true,
  // },
});



module.exports = mongoose.model('User', UserSchema);
module.exports.UserSchema = UserSchema;
//module.exports = mongoose.model('User', UserSchema);
=======
});

module.exports = mongoose.model('User', UserSchema);
>>>>>>> origin/marwan
