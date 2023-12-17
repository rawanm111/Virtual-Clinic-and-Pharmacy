const express = require('express');
const router = express.Router();
const notifcontroller = require('../Controllers/notifControllers');

router.get('/',notifcontroller.getPharmNotifications);
router.put('/',notifcontroller.addNotificationPharm);
module.exports = router;