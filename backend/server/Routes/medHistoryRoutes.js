const express = require('express');
const router = express.Router();
const multer = require('multer');
const medicalHistoryController = require('../Controllers/medHistoryController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload/:id', upload.single('file'), medicalHistoryController.uploadDocument);
router.delete('/delete/:id/:documentId', medicalHistoryController.deleteDocument);
router.get('/patient/:id', medicalHistoryController.getAllHistoriesByPatient);
router.get('/file/:id/:documentName', medicalHistoryController.getDocumentByName); // Modify the route here
module.exports = router;
