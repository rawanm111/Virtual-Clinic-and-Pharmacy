const express = require('express');
const router = express.Router();
const medicalHistoryController = require('../Controllers/MedicalHistory');

// Create a new medical history record
router.post('/', medicalHistoryController.createMedicalHistory);

// Remove a medical history record by ID
router.delete('/:id', medicalHistoryController.deleteMedicalHistory);

router.get('/',medicalHistoryController.getAllMedicalHistory);

// You can add more routes for listing, updating, or other operations here if needed.

module.exports = router;