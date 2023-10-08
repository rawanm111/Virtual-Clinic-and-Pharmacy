const express = require('express');
const router = express.Router();
const PharmacistController = require('../Controllers/PharmacistController');

router.post('/', PharmacistController.createPharmacist);
router.get('/', PharmacistController.getPharmacist);
router.put('/:userid', PharmacistController.updatedPharmacist);
router.delete('/:userid', PharmacistController.deletePharmacist);

module.exports = router;