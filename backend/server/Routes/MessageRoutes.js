const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/MessageController');

router.get('/:patientId/:doctorId', messageController.getMessages);
router.post('/:chatId', messageController.createMessage);
router.put('/:chatId/:messageId', messageController.updateMessages);

module.exports = router;
