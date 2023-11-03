const mongoose = require('mongoose');

const healthRecordsSchema= new mongoose.Schema ({

    patientname: {
        type: String,
        required : true,
    },

    patientId: {
        type: Number,
        required:true,
    },
    diagnosis: {
        type: String,
        required: true,
    },


});

module.exports = mongoose.model('HealthRecords', healthRecordsSchema);