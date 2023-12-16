// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   chatId: {
//     type: String,
//     required: true,
//   },
//   messages: [
//     {
//       sender: {
//         type: String,
//         required: true,
//       },
//       text: {
//         type: String,
//         required: true,
//       },
//       timestamp: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
// });

// const Message = mongoose.model('Message', messageSchema);

// module.exports = Message;

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
 
  participantDoc: 
    {
      type: String,
      required: true,
    },
    participantPatient: 
    {
      type: String,
      required: true,
    },

  aggregatedMessages: [
    {
      sender: {
        type: String,
        required: true,
      },
      receiver: {
        type: String,
        required: true,
      },

    text: {
        type: String,
        required: true,
        },
    timestamp: {
        type: Date,
        default: Date.now,
        },
    },
  ],
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
