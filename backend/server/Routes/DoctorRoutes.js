const express = require('express');
const router = express.Router();
const DoctorsController = require('../Controllers/DoctorsController');

router.post('/', DoctorsController.createDoc);
router.get('/', DoctorsController.getAllDoctors);
router.delete('/:userid', DoctorsController.deleteDoc);
router.delete('/:username', DoctorsController.deleteDoctorByUsername);
router.put('/:username', DoctorsController.updateDoctorByUsername);
router.get('/:username', DoctorsController.getDoctorByUsername);
router.get('/get/:id', DoctorsController.getDoctorById);
router.get('/drPrescriptions/:id', DoctorsController.getDoctorPrescriptions);
router.post('/addPrescription/:id', DoctorsController.addPrescription);
router.post('/addMedicineToPrescription/:id', DoctorsController.addMedicine);
router.post('/deleteMedicineFromPrescription/:id', DoctorsController.deleteMedicine);
router.post('/updateMedicinedosageFromPrescription/:id', DoctorsController.updateDosage);

module.exports = router;