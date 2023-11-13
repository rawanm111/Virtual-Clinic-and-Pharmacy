const express = require('express');
const router = express.Router();
const patientPackages = require('../Controllers/PatientPackages.js');

router.post('/', patientPackages.createPatientPackages);
router.get('/:id', patientPackages.getAllPatientPackages);
// router.put('/:patientId', patientPackages.cancelAllPatientPackages);
router.put('/:patientId/cancel-package/:packageName', patientPackages.cancelPatientPackage);


module.exports = router;