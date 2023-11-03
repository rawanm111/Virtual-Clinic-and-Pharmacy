//const User = require('../models/user.model');
const Doctor = require('../Models/doccs');
const Patient = require('../models/patient.model');
const Admin = require('../Models/admin.model');
const Pharmacist = require('../Models/pharmacist.model');


// Login endpoint for admin
router.post('/login', async (req, res) => {
    try {
      // Find the admin by username
      const admin = await Admin.findOne({ username: req.body.username });
  
      // If admin not found, send an error message
      if (!admin) {
        return res.status(407).json({ success: false, message: 'Admin not found' });
      }
  
      // Compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(req.body.password, admin.password);
      
      // If the password matches, respond with success
      if (isMatch) {
        res.json({ success: true, message: 'Logged in successfully' });
      } else {
        // If the password does not match, send an error message
        res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
    } catch (error) {
      // Handle any other errors
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  module.exports = router;