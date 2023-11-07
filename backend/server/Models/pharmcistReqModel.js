const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pharmcistReqSchema = new Schema({
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
module.exports = mongoose.model('pharmcistReq', pharmcistReqSchema )