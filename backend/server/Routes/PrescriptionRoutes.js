const express = require('express');
const router = express.Router();
const PrescriptionController = require('../Controllers/PrescriptionController');

// Define routes for Prescription
//router.post('/patients', PrescriptionController.getPrescriptionsForPatients);
router.get('/:doctorId', PrescriptionController.getPrescriptionsForDoctor);
router.get('/', PrescriptionController.getAllPrescriptions);
router.put('/:id', PrescriptionController.updatePrescription);
router.delete('/:id', PrescriptionController.deletePrescription);
router.get('/:patientId', PrescriptionController.getPrescriptionsForPatient);
router.get('/create', PrescriptionController.createPrescription);


module.exports = router;
