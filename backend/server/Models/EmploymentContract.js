const mongoose = require('mongoose');

const employmentContractSchema = new mongoose.Schema({
    employeeName: {
        type: String,
        required: true,
    },
    employeeId: {
        type: Number,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    salary: {
        type: Number,
        required: true,
    },
    // You can add more fields to represent other contract details
});

module.exports = mongoose.model('EmploymentContract', employmentContractSchema);
