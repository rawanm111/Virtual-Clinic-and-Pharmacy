const express = require('express');
const router = express.Router();
const PatientController = require('../Controllers/PatientController');


router.post('/', PatientController.createPatient);
router.get('/', PatientController.getPatient);
router.get('/p/:docId', PatientController.getPatientsByDoctorId);
router.put('/:username', PatientController.updatePatient);
router.delete('/:userid', PatientController.deletePatient);
router.get('/:username', PatientController.getPatientByUsername);
router.post('/api/addFamilyMember/:userid', PatientController.addFamilyMemberLinkedToPatient);
router.get('/family_members/user/:id', PatientController.getFamilyMembersForUser);
router.get('/patientPrescriptions/:id', PatientController.getPatientPrescriptions);
router.get('/getPrescription/:id', PatientController.getPrescriptionById);

module.exports = router;

