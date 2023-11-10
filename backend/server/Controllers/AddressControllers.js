// Import necessary modules
const Address = require('../Models/Address');

// Controller function to add a new address for a patient
exports.addAddress = async (req, res) => {
  try {
    const { patient, address } = req.body;

    // Create a new address document
    const newAddress = new Address({ patient: patient, address });

    // Save the new address to the database
    const savedAddress = await newAddress.save();

    res.status(201).json(savedAddress);
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Failed to add address.' });
  }
};

// Controller function to get addresses for a specific patient
exports.getAddressesByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find addresses associated with the specified patient
    const addresses = await Address.find({ patient: patientId });

    res.status(200).json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Failed to fetch addresses.' });
  }
};
