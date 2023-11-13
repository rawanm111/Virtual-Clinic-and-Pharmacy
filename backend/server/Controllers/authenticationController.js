//require('dotenv').config({ path: '../backend/server/.env' }); // This line should be at the very top of your main file
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const Doctor = require('../Models/doccs');
const Patient = require('../Models/patients');
const Admin = require('../Models/Admin');
const Pharmacist = require('../Models/pharmacists');
const patients = require('../Models/patients');
const doccs = require('../Models/doccs');
const pharmacists = require('../Models/pharmacists');

// Set up NodeMailer transporter
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zeinaelmofty@gmail.com',
    pass: 'udsg rmzv vmqu uhxj'
  }
});
const otpStorage = new Map();

// var mailOptions = {
//   from: 'marwantest70@gmail.com',
//   to: 'marwantest70@gmail.com',
//   subject: 'Reset Password Link',
//   text: `haaaaa${otp}`
// };




const sendOtp = async (req, res) => {
  try {
    const { username } = req.body;
    // Define a mapping from role to model
    const Models = [
      { model: doccs, role: 'Doctor' },
      { model: patients, role: 'Patient' },
      { model: Admin, role: 'Admin' },
      { model: Pharmacist, role: 'Pharmacist' }
    ];

    // Find the model based on the role
    // const Model = roleToModelMapping[role];
    // if (!Model) {
    //   return res.status(400).json({ message: 'Invalid user role' });
    // }

    // Find the user in the respective model
    
    for (const Model of Models){
    const user = await Model.model.findOne({ username: username });
    
    if (user) {
      const otp = `${Math.floor(100000 + Math.random() * 900000)}`;
      // TODO: Store the OTP securely and associate it with the user for later verification
      otpStorage.set(user.username,otp);
      console.log(otpStorage);
      var mailOptions = {
        from: 'marwanayman678@gmail.com',
        to: user.email,
        subject: 'Reset Password Link',
        text: `Your OTP for resetting your password is: ${otp}` // Include the OTP in the email text
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.error(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.send({ Status: "Success" });
        }
      });
      

      return res.status(200).json({ message: 'OTP sent to mail successfully bgad' });
    }
  }  
      return res.status(404).json({ message: 'User not kabab' });
    
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ message: 'An error occurred during the OTP sending process' });
  }
};
// module.exports = sendOtp;


// Example controller for verifying OTP
const verifyOtp = async (req, res) => {
  try {
    const { username,otp } = req.body;

    // Assuming you have a method to get the stored OTP for a user
    const storedOtp = otpStorage.get(username);

    if (!storedOtp) {
      return res.status(404).json({ message: 'OTP expired' });
    }

    if (otp === storedOtp) {
      // Optionally, remove the OTP from storage after successful verification
     
      otpStorage.delete(username);
      // Handle successful verification
      return res.status(200).json({ message: 'OTP verified successfully' });
      
    } else {
      return res.status(400).json({ message: 'Wrong OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'An error occurred while verifying OTP' });
  }
};


const models = [patients, doccs, pharmacists]; // Add all your user models here

const resetPass = async (req, res) => {
  const { username } = req.body;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    let updatedUser = null;
    for (const model of models) {
      updatedUser = await model.findOneAndUpdate(
        { username: username },
        { password: hashedPassword },
        { new: true }
      );
      if (updatedUser) break;
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, remove the password from the response for security
    updatedUser.password = undefined;

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const changePass = async (req, res) => {
  const { id } = req.body;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ message: 'New password is required' });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    let updatedUser = null;
    for (const model of models) {
      updatedUser = await model.findOneAndUpdate(
        { _id: id },
        { password: hashedPassword },
        { new: true }
      );
      if (updatedUser) break;
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Optionally, remove the password from the response for security
    updatedUser.password = undefined;

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userTypes = [
      { model: patients },
      { model: doccs},
      { model: Admin },
      { model: Pharmacist }
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
            role: user.role,
            //role: userType.role,
            userId: user._id
          });
        } else {
          // await sendOtp(user);
          return res.status(406).json({ success: false, message: 'Wrong password' });
        }
      }
    }
    return res.status(404).json({ success: false, message: 'invalid username' });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};







// const verifyemail = async (req, res) => {
//   try {
//     const {email} = req.body;
//     const userTypes = [
//       { model: Doctor, role: 'Doctor' },
//       { model: Patient, role: 'Patient' },
//       { model: Admin, role: 'Admin' },
//       { model: Pharmacist, role: 'Pharmacist' }
//     ];
//     for (const userType of userTypes) {
//       const user = await userType.model.findOne({ email: email });
//       if (user) {
//         console.log('User found:', user); // Log the user object
//         // const passwordMatch = await bcrypt.compare(password, user.password);
//         // console.log('Password Match:', passwordMatch); // Log the result of password comparison
//         // if (passwordMatch) {
//         //   return res.json({
//         //     success: true,
//         //     message: 'Logged in successfully',
//         //     role: userType.role
//         //   });
//         // } else {
//         //   // await sendOtp(user);
//         //   return res.status(406).json({ success: false, message: 'Wrong password' });
//         // }
//       }
//     }
//     return res.status(404).json({ success: false, message: 'User not found' });
//   } catch (error) {
//     console.error(error); // Log the actual error for debugging
//     res.status(500).json({ success: false, message: 'An error occurred during login' });
//   }
// };



module.exports = {
  sendOtp,verifyOtp,login,resetPass, changePass
};
