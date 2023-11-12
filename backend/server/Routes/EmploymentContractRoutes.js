const express = require('express');
const router = express.Router();
const employmentContractController = require('../Controllers/EmploymentContract');

// View all employment contracts
router.get('/', employmentContractController.getAllEmploymentContracts);

// View an employment contract by ID

// Create a new employment contract
router.post('/', employmentContractController.createEmploymentContract);

// Update an employment contract by ID
router.put('/:id', employmentContractController.updateEmploymentContract);

// Delete an employment contract by ID
router.delete('/:id', employmentContractController.deleteEmploymentContract);

// Accept an employment contract by ID

module.exports = router;
