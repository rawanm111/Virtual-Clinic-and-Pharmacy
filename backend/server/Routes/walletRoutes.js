const express = require('express');
const router = express.Router();
const walletController = require('../Controllers/walletController');

// Create a wallet for a patient
router.post('/:patientId/create', walletController.createWallet);

// Get the wallet for a patient
router.get('/:patientId', walletController.getWallet);

// Update the wallet balance for a patient
router.put('/:patientId/update-balance', walletController.updateWalletBalance);
router.put('/:appointmentId/patient-refund', walletController.refundPatient);
module.exports = router;
