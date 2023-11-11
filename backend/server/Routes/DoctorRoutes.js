const express = require('express');
const router = express.Router();
const DoctorsController = require('../Controllers/DoctorsController');

router.post('/', DoctorsController.createNewDoc);
router.get('/', DoctorsController.getAllDoctors);
router.delete('/:userid', DoctorsController.deleteDoc);
router.delete('/:username', DoctorsController.deleteDoctorByUsername);
router.put('/:username', DoctorsController.updateDoctorByUsername);
router.get('/:username', DoctorsController.getDoctorByUsername);
router.get('/get/:id', DoctorsController.getDoctorById);

module.exports = router;