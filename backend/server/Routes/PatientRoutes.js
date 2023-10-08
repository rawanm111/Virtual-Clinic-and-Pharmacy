const express = require('express');
const router = express.Router();
const PatientController = require('../Controllers/PatientController');

router.post('/', PatientController.createPatient);
router.get('/', PatientController.getPatient);
router.put('/:userid', PatientController.updatePatient);
router.delete('/:userid', PatientController.deletePatient);

module.exports = router;