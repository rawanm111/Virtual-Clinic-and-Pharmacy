<<<<<<< HEAD
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const drReqSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    birthdate:{
        type: String,
        required: true
    },
    hourlyRate:{
        type: Number,
        required: true
    },hospital:{
        type: String,
        required: true
    },
    educationalBackground:{
        type: String,
        required: true
    }
}, {timestamps: true})
=======
const mongoose = require('mongoose');
const drReqSchema = new mongoose.Schema({
  
username: {
  type: String,
  required: true,
},

fullName: {
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

hourlyRate: {
  type: Number,
  required: true,
}, 
dateOfBirth: {
    type: String,
    required: true
  },
affiliation: {
  type: String,
  required: true,
},
educationalBackground: {
  type: String,
  required: true,
},
speciality: {
  type: String,
  required: true,
},


});

>>>>>>> origin/marwan
module.exports = mongoose.model('drReq', drReqSchema )