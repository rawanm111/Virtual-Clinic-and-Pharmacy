// Import the necessary modules
const express = require('express');
const router = express.Router();
const { submitDrReq, getReq, getAllReq } = require('../Controllers/drReqController');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the routes
// POST endpoint for submitting a new doctor registration request
router.post('/', upload.fields([
  { name: 'nationalIdFile', maxCount: 1 },
  { name: 'medicalLicenseFile', maxCount: 1 },
  { name: 'medicalDegreeFile', maxCount: 1 }
]), submitDrReq);

// GET endpoint to retrieve all doctor registration requests
router.get('/', getAllReq);

// GET endpoint to retrieve a single doctor registration request
router.get('/:id', getReq);

// Export the router
module.exports = router;
