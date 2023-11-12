const express = require('express');
const router = express.Router();
const addressController = require('../Controllers/AddressControllers');

// Route to add a new address for a patient
router.post('/add', addressController.addAddress);

// Route to get addresses for a specific patient
router.get('/addresses/:patientId', addressController.getAddressesByPatientId);

module.exports = router;
