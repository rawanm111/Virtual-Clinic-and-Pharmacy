const express = require('express');
const router = express.Router();
const PharmacistController = require('../Controllers/PharmacistController');

router.post('/', PharmacistController.createPharmacist);
router.get('/', PharmacistController.getPharmacist);
router.delete('/:userid', PharmacistController.deletePharmacist);
router.put('/:username', PharmacistController.updatePharmacistByUsername);
router.get('/:username', PharmacistController.getPharmacistByUsername);

module.exports = router;