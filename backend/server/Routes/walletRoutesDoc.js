const express = require('express');
const router = express.Router();
const walletController = require('../Controllers/walletControllerDoc');

// Create a wallet for a patient
router.post('/:doctorId/create', walletController.createWallet);

// Get the wallet for a patient
router.get('/:doctorId', walletController.getWallet);

// Update the wallet balance for a patient
router.put('/:doctorId/update-balance', walletController.updateWalletBalance);

module.exports = router;
