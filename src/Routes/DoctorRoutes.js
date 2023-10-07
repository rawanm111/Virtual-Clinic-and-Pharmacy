const express = require('express');
const router = express.Router();
const DoctorsController = require('../Controllers/DoctorsController');

router.post('/', DoctorsController.createNewDoc);
router.get('/', DoctorsController.getAllDoctors);
router.put('/:username', DoctorsController.updateDoc);
router.delete('/:username', DoctorsController.deleteDoc);

module.exports = router;