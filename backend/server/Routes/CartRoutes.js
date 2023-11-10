const express = require('express');
const router = express.Router();
const cartController = require('../Controllers/CartControllers.js');

// Define routes for Health Packages

router.post('/add', cartController.addToCart);
router.put('/update', cartController.updateCartItemQuantity);
router.delete('/remove', cartController.removeFromCart);
router.get('/:patientId', cartController.getCartByPatientId);
router.post('/addresses/add', cartController.addAddress);

// Add new route for fetching addresses
router.get('/addresses/:patientId', cartController.getAddressesByPatientId);

// Add new route for selecting a medication for a cart
router.put('/select-medication', cartController.selectMedication);
router.put('/update-address', cartController.updateAddress);

module.exports = router;
