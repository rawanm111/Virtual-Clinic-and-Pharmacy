const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  participantDoc: {
    type: String,
  },
  participantPatient: {
    type: String,
  },
  aggregatedMessages: [
    {
      sender: {
        type: String,
        required: true,
      },
      receiver: {
        type: String,
        // required: true,
      },
      text: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['unread', 'read', 'replied'],
        default: 'unread',
      },
    },
  ],
  broadcast: {
    type: Boolean,
    default: false,
  },
  subject: {
    type: String,
  },
});

const MessagePharm = mongoose.model('MessagePharm', messageSchema);

module.exports = MessagePharm;
