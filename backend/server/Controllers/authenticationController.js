const bcrypt = require('bcrypt');
const Doctor = require('../Models/doccs');
const Patient = require('../Models/patients');
const Admin = require('../Models/Admin');
const Pharmacist = require('../Models/pharmacists');


const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userTypes = [
      { model: Doctor, role: 'Doctor' },
      { model: Patient, role: 'Patient' },
      { model: Admin, role: 'Admin' },
      { model: Pharmacist, role: 'Pharmacist' }
    ];
    for (const userType of userTypes) {
      const user = await userType.model.findOne({ username: username });
      if (user) {
        console.log('User found:', user); 
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log('Password Match:', passwordMatch); 
        if (passwordMatch) {
          return res.json({
            success: true,
            message: 'Logged in successfully',
            role: userType.role,
            userId: user._id
          });
        } else {
          return res.status(406).json({ success: false, message: 'Wrong password' });
        }
      }
    }
    return res.status(404).json({ success: false, message: 'User not found' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};


module.exports = {
  login
};
