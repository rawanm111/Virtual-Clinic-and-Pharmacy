const admin = require('../Models/Admin.js');
const bcrypt = require('bcrypt');

exports.createAdmin = async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;

    console.log('Received data:', req.body);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new admin({
      username,
      password: hashedPassword, 
    });
    console.log('New Admin:', newAdmin); 
    const savedAdmin = await newAdmin.save();
    console.log('Saved Admin:', savedAdmin); 
    res.status(201).json(savedAdmin);
  } catch (err) {
    console.error(err);
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


