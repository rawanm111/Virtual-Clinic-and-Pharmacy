
const express = require('express');
const router = express.Router();
const employmentContractController = require('../Controllers/EmploymentContract');

router.post('/create', employmentContractController.createEmploymentContract);
router.get('/all', employmentContractController.getAllEmploymentContracts);
router.delete('/:contractId', employmentContractController.deleteEmploymentContract);
router.put('/:contractId', employmentContractController.updateEmploymentContract);
router.get('/status/:userId', employmentContractController.getContractStatusByDoctorId);
router.put('/updateStatus/:doctorId', employmentContractController.updateContractStatusToActive);
router.get('/details/:doctorId', employmentContractController.getEmploymentContractDetailsByDoctorId);

module.exports = router;
