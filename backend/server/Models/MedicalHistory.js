const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId, // Correctly reference mongoose.Schema.Types.ObjectId
        ref: 'patients',
        required: false,
    },
    diagnosis: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);
