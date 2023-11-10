const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authenticationController');

router.post('/login', authController.login);
router.post('/sendotp',authController.sendOtp);
router.post('/verifyotp',authController.verifyOtp)
router.put('/resetpassword', authController.resetPass);

module.exports = router;