const bcrypt = require('bcrypt');
const Doctor = require('../Models/doccs');
const Patient = require('../Models/patients');
const Admin = require('../Models/Admin');
const Pharmacist = require('../Models/pharmacists');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Set up NodeMailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // This can be replaced with any other service
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const SendOTPController = {
  async otpemail(req, res) {
    const { username } = req.body;

    try {
      // Fetch the user from the database using the username
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      // Generate a 6-digit OTP
      const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

      // Send the email with the OTP
      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: 'Password Reset OTP',
        text: `Your OTP for resetting your password is: ${otp}`,
        // You can also use HTML body content
      });

      // Response to the frontend upon successful sending
      res.status(200).send({ message: 'OTP has been sent to your email.' });

      // TODO: Store the OTP in the database or cache for verification later
      // You might want to hash the OTP and store it with an expiry time.

    } catch (error) {
      console.error('Error in sending OTP: ', error);
      res.status(500).send({ message: 'Failed to send OTP due to server error.' });
    }
  }
};

module.exports = SendOTPController;
