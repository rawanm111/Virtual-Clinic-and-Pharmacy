const express = require('express');
const router = express.Router();
const PrescriptionController = require('../Controllers/PrescriptionController');

// Define routes for Prescription
//router.post('/patients', PrescriptionController.getPrescriptionsForPatients);
router.get('/:doctorId', PrescriptionController.getPrescriptionsForDoctor);
router.get('/', PrescriptionController.getAllPrescriptions);
router.put('/update/:id', PrescriptionController.updatePrescription);
router.delete('/:id', PrescriptionController.deletePrescription);
<<<<<<< HEAD
router.get('/pat/:patientId', PrescriptionController.getPrescriptionsForPatient);
=======
router.get('/patientPrescription/:id', PrescriptionController.getPrescriptionsForPatient);
>>>>>>> 46deba00d352edab8740c55b567574c095c75be2
router.post('/create', PrescriptionController.createPrescription);


module.exports = router;