const express = require('express');
const router = express.Router();
const patientPackages = require('../Controllers/PatientPackages.js');

router.post('/', patientPackages.createPatientPackages);
router.get('/', patientPackages.getAllPatientPackages);
router.get('/:patientId', patientPackages.getPatientPackagesById);
router.put('/:patientId', patientPackages.cancelAllPatientPackages);




module.exports = router;