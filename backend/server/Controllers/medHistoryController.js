
const MedicalHistory = require('../Models/medHistory');

// Upload a new document
const uploadDocument = async (req, res) => {
  try {
    const patientId = req.params.id;
    const file = req.file;

    if (!patientId || !file) {
      return res.status(400).json({ message: 'Patient ID and file are required' });
    }

    const medicalHistory = await MedicalHistory.findOne({ patientId });

    if (!medicalHistory) {
      // Inside uploadDocument function
const newMedicalHistory = new MedicalHistory({
  patientId,
  documents: [{ filename: file.originalname, data: file.buffer, contentType: file.mimetype }],
});

      await newMedicalHistory.save();
    } else {
      medicalHistory.documents.push({ filename: file.originalname, data: file.buffer });
      await medicalHistory.save();
    }

    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};

// Delete a document
// Delete a document
const deleteDocument = async (req, res) => {
  try {
    const patientId = req.params.id;
    const documentId = req.params.documentId;

    if (!patientId || !documentId) {
      return res.status(400).json({ message: 'Patient ID and document ID are required' });
    }

    const medicalHistory = await MedicalHistory.findOne({ patientId });

    if (medicalHistory) {
      const documentToRemove = medicalHistory.documents.id(documentId);

      if (documentToRemove) {
        const mongooseDocument = documentToRemove.toObject(); // Convert to a Mongoose document
        medicalHistory.documents.remove(mongooseDocument);
        await medicalHistory.save();
        res.json({ message: 'File deleted successfully' });
      } else {
        res.status(404).json({ message: 'Document not found in the medical history' });
      }
    } else {
      res.status(404).json({ message: 'Medical history not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing the request' });
  }
};



const getAllHistoriesByPatient = async (req, res) => {
    try {
      const patientId = req.params.id;
      if (!patientId) {
        return res.status(400).json({ message: 'Patient ID is required' });
      }
  
      const medicalHistories = await MedicalHistory.find({ patientId });
  
      res.status(200).json(medicalHistories);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  };


  const getDocumentByName = async (req, res) => {
    try {
      const patientId = req.params.id;
      const documentName = req.params.documentName;
  
      if (!patientId || !documentName) {
        return res.status(400).json({ message: 'Patient ID and document name are required' });
      }
  
      const medicalHistory = await MedicalHistory.findOne({ patientId });
  
      if (medicalHistory) {
        const document = medicalHistory.documents.find(doc => doc.filename === documentName);
  
        if (document) {
          const base64Data = document.data.toString('base64'); // Convert Buffer to base64 string
          const contentType = document.contentType || 'application/octet-stream';
  
          res.set('Content-Type', contentType);
          return res.send(base64Data);
        }
      }
  
      res.status(404).json({ message: 'Document not found' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the request' });
    }
  };
  
  



module.exports = {
  uploadDocument,
  deleteDocument,
  getAllHistoriesByPatient,
  getDocumentByName,
};
