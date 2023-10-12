const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/Admincontrollers.js');
router.post('/', adminController.createAdmin);
router.get('/', adminController.getAlladmin);
router.delete('/:id', adminController.deleteAdmin);
module.exports = router;