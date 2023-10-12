const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    
    PatientID : {
         type :Number,
         required: true,
        }
    ,DocID: {
        type: Number,
        required: true,
    },
    filled : {
        type: Boolean,
        required: true,
    },
        
       
    },
    {
        timestamps: true,
    }


);

module.exports = mongoose.model('Prescription', PrescriptionSchema);
  