// Import necessary modules and controllers
const express = require('express');
const router = express.Router();
const cancelOrderController = require('../Controllers/CancelOrderController');

// Define the route for canceling an order
router.put('/cancel-order/:id', cancelOrderController.cancelOrder);

// Export the router
module.exports = router;
