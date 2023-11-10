const mongoose = require('mongoose');

const walletSchemaDoc = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  },
  
  balance: {
    type: Number,
    default: 0,
  },
});

const walletDoc = mongoose.model('walletDoc', walletSchemaDoc);

module.exports = walletDoc;
