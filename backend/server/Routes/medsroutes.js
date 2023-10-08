const express = require('express');
const router = express.Router();
const medController = require('../Controllers/medscontrollers.js');

// Define routes for Health Packages
router.post('/', medController.createmeds);
router.get('/', medController.getAllmeds);
router.put('/:id', medController.updatemeds);
router.delete('/:id', medController.deletemeds);

module.exports = router;
