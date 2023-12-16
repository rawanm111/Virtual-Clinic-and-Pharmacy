const express = require('express');
const router = express.Router();
const multer = require('multer');
const medController = require('../Controllers/medscontrollers.js');
const notifcontroller = require('../Controllers/notifControllers');
// Set up Multer for handling file uploads
const storage = multer.memoryStorage(); // You can customize the storage as needed
const upload = multer({ storage: storage });

// Define routes for Health Packages
router.post('/', medController.createmeds);
router.get('/', medController.getAllmeds);
router.put('/:id', medController.updatemeds);
router.delete('/:id', medController.deletemeds);
router.put('/updateDescription/:id', medController.updateDescription);
router.put('/updatePrice/:id', medController.updatePrice);
router.get('/:medicationId', medController.getMedicationById);
// Route for updating picture with file upload
router.put('/updatePicture/:id', upload.single('file'), medController.updatePicture);
router.put('/deduct-quantity/:medicationId', medController.deductQuantity);
router.put('/notif',notifcontroller.addNotificationPharm);
module.exports = router;
