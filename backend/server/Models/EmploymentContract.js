const mongoose = require('mongoose');

const employmentContractSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctors', 
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now, 
    required: true,
  },
  endDate: {
    type: Date,
  },
  salary: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Inactive',
  },
});

module.exports = mongoose.model('EmploymentContract', employmentContractSchema);
