const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/MessageDocController');

router.get('/:doctorId/:patientId', messageController.getMessages);
router.post('/:chatId', messageController.createMessage);
router.put('/:chatId/:messageId', messageController.updateMessages);

module.exports = router;
