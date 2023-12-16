const express = require('express');
const router = express.Router();
const walletControllerPharmacist = require('../Controllers/walletPharmacistController');

// Create a wallet for a pharmacist
router.post('/:pharmacistId/create', walletControllerPharmacist.createWallet);

// Get the wallet for a pharmacist
router.get('/:pharmacistId', walletControllerPharmacist.getWallet);

// Update the wallet balance for a pharmacist
router.put('/:pharmacistId/update-balance', walletControllerPharmacist.updateWalletBalance);

// Handle refund to pharmacist's wallet
router.post('/:pharmacistId/refund', walletControllerPharmacist.handleWalletRefund);

module.exports = router;
