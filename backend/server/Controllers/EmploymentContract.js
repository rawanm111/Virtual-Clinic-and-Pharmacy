// employmentContractController.js

const EmploymentContract = require('../Models/EmploymentContract.js');



exports.createEmploymentContract = async (req, res) => {
  try {
    const contractData = req.body;
    const newContract = await EmploymentContract.create(contractData);
    res.status(201).json(newContract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllEmploymentContracts = async (req, res) => {
  try {
    const allContracts = await EmploymentContract.find();
    res.status(200).json(allContracts);
  } catch (err) {
    res.status(500).json(err);
  }
};

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
