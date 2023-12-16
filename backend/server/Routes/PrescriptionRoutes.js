const express = require('express');
const router = express.Router();
const PrescriptionController = require('../Controllers/PrescriptionController');

// Define routes for Prescription
//router.post('/patients', PrescriptionController.getPrescriptionsForPatients);
router.get('/:doctorId', PrescriptionController.getPrescriptionsForDoctor);
router.get('/', PrescriptionController.getAllPrescriptions);
router.put('/update/:id', PrescriptionController.updatePrescription);
router.delete('/:id', PrescriptionController.deletePrescription);
router.get('/pat/:patientId', PrescriptionController.getPrescriptionsForPatient);
router.post('/create', PrescriptionController.createPrescription);


module.exports = router;