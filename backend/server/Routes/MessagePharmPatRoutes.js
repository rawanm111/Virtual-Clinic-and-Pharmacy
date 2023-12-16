const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/MessagePharmPatController');

router.post('/:id', messageController.createMessage);
router.get('/:id', messageController.getMessages);


module.exports = router;

