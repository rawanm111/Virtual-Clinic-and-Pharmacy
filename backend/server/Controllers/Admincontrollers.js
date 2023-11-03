<<<<<<< HEAD
const admin = require('../Models/Admin.js');

exports.createAdmin = async (req, res) => {
  try {
    const newadmin = new admin(req.body);
    const savedadmin = await newadmin.save();
    res.status(201).json(savedadmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAlladmin = async (req, res) => {
  try {
    const findadmin = await admin.find();
    res.status(200).json(findadmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    await admin.findByIdAndDelete(req.params.userid);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};


=======
const admin = require('../Models/Admin.js');

exports.createAdmin = async (req, res) => {
  try {
    const newadmin = new admin(req.body);
    const savedadmin = await newadmin.save();
    res.status(201).json(savedadmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAlladmin = async (req, res) => {
  try {
    const findadmin = await admin.find();
    res.status(200).json(findadmin);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    await admin.findByIdAndDelete(req.params.userid);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};


>>>>>>> origin/marwan
