const express = require('express');
const router = express.Router();
const HealthRecControllers = require('../Controllers/HealthRecControllers.js');

// Create a new health record
router.post('/', HealthRecControllers.createHealthRecords);

// Get all health records
router.get('/', HealthRecControllers.getAllHealthRecords);
// Get patient health records

router.get('/patient/:id', HealthRecControllers.getallHealthRecordsPatient);


// Update a health record by ID
router.put('/:id', HealthRecControllers.updateHealthRecords);

// Delete a health record by ID
router.delete('/:id', HealthRecControllers.deleteHealthRecords);
module.exports = router;