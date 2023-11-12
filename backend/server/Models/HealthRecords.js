
const mongoose = require('mongoose');
const { Schema } = mongoose;

const healthRecordsSchema= new mongoose.Schema ({
    patient: {
        type: Schema.Types.ObjectId,
        ref: './patients',
        required: false,
      },

    diagnosis: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },


});

module.exports = mongoose.model('HealthRecords', healthRecordsSchema);