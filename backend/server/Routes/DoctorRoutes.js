const express = require('express');
const router = express.Router();
const DoctorsController = require('../Controllers/DoctorsController');

router.post('/', DoctorsController.createNewDoc);
router.get('/', DoctorsController.getAllDoctors);
router.put('/:id', DoctorsController.updateDoc);
router.delete('/:id', DoctorsController.deleteDoc);
router.delete('/:username', DoctorsController.deleteDoctorByUsername);
router.put('/:username', DoctorsController.updateDoctorByUsername);
router.get('/:username', DoctorsController.getDoctorByUsername);


module.exports = router;