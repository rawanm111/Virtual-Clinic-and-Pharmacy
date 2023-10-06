const HealthPackage = require('../Models/HealthPackage');

// Create a new Health Package
exports.createHealthPackage = async (req, res) => {
  try {
    const newPackage = new HealthPackage(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Retrieve all Health Packages
exports.getAllHealthPackages = async (req, res) => {
  try {
    const packages = await HealthPackage.find();
    res.status(200).json(packages);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a Health Package
exports.updateHealthPackage = async (req, res) => {
  try {
    const updatedPackage = await HealthPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPackage);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a Health Package
exports.deleteHealthPackage = async (req, res) => {
  try {
    await HealthPackage.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};
