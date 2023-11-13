const EmploymentContract = require('../Models/EmploymentContract.js');
const Doctor = require('../Models/doccs.js'); // Assuming this is the name of your doctor model

// Create an employment contract
exports.createEmploymentContract = async (req, res) => {
  try {
    const contractData = req.body;
    const newContract = await EmploymentContract.create(contractData);
    res.status(201).json(newContract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all employment contracts
exports.getAllEmploymentContracts = async (req, res) => {
  try {
    const allContracts = await EmploymentContract.find();
    res.status(200).json(allContracts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete an employment contract
exports.deleteEmploymentContract = async (req, res) => {
  try {
    await EmploymentContract.findByIdAndDelete(req.params.contractId);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update an employment contract
exports.updateEmploymentContract = async (req, res) => {
  try {
    const updatedContract = await EmploymentContract.findByIdAndUpdate(
      req.params.contractId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedContract);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get contract status by doctor ID
exports.getContractStatusByDoctorId = async (req, res) => {
  try {
    const doctorId = req.params.userId;
    const contract = await EmploymentContract.findOne({ employeeId: doctorId });
    if (!contract) {
      res.status(404).json({ message: 'Employment contract not found for the specified doctor ID.' });
      return;
    }
    res.status(200).json({ status: contract.status });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update contract status to "Active" by doctor ID
exports.updateContractStatusToActive = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404).json({ message: 'Doctor not found for the specified ID.' });
      return;
    }
    const updatedContract = await EmploymentContract.findOneAndUpdate(
      { employeeId: doctorId },
      { status: 'Active' },
      { new: true }
    );
    if (!updatedContract) {
      res.status(404).json({ message: 'Employment contract not found for the specified doctor ID.' });
      return;
    }
    res.status(200).json(updatedContract);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getEmploymentContractDetailsByDoctorId = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const contract = await EmploymentContract.findOne({ employeeId: doctorId });
    if (!contract) {
      res.status(404).json({ message: 'Employment contract not found for the specified doctor ID.' });
      return;
    }
    res.status(200).json(contract);
  } catch (err) {
    res.status(500).json(err);
  }
};
