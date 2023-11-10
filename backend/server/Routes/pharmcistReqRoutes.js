const express = require('express');
const router = express.Router();
const {
    getAllReq,
    getReq,
    deletereqs,
    submitPharmacistReq,
} = require('../Controllers/pharmcistReqController');  // Corrected the controller import
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.fields([
  { name: 'nationalIdFile', maxCount: 1 },
  { name: 'pharmacyDegreeFile', maxCount: 1 },
  { name: 'workingLicenseFile', maxCount: 1 }
]), submitPharmacistReq);

router.get('/', getAllReq);

router.get('/:id', getReq);

router.delete('/delete/:id', deletereqs);

router.patch('/:id', (req, res) => {
  res.json({ mssg: 'This request has been accepted' });
});

router.patch('/:id', (req, res) => {
  res.json({ mssg: 'This request has been rejected' });
});

module.exports = router;
