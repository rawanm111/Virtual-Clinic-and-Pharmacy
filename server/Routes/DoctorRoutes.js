const express = require('express');
const router = express.Router();
const DoctorsController = require('../Controllers/DoctorsController');

router.post('/', DoctorsController.createNewDoc);
router.get('/', DoctorsController.getAllDoctors);
router.put('/:id', DoctorsController.updateDoc);
router.delete('/:id', DoctorsController.deleteDoc);

module.exports = router;