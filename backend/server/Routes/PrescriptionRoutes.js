const express = require('express');
const router = express.Router();
const PrescriptionController = require('../Controllers/PrescriptionController');

// Define routes for Prescription
router.post('/', PrescriptionController.createPrescription);
router.get('/', PrescriptionController.getAllPrescriptions);
router.put('/:id', PrescriptionController.updatePrescription);
router.delete('/:id', PrescriptionController.deletePrescription);
router.get('/:patientID', PrescriptionController.getPrescriptionwithPatientID );


module.exports = router;