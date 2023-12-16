const mongoose = require('mongoose');

// Schema definition
const notifSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    required: true,
    enum: ['patients', 'doctors']
  },
  title: {
    type: String,
    required: true,
    enum: ['Confirmed', 'Cancelled', 'Rescheduled','Accepted','Rejected']
  },
  content: {
    patientUsername: String,
    doctorUsername: String,
    appointmentTime: Date
  }
});

// Create the model
const Notif = mongoose.model('Notif', notifSchema);

module.exports = Notif;