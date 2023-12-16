const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  receiver: {
    type: String,
    required: true,
    enum: ['Doctor', 'Patient', 'Pharm']
  },
  time: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    enum: ['Confirmed', 'Cancelled', 'Rescheduled']
  },
  
});

module.exports = mongoose.model('Notification', NotificationSchema);