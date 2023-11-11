
const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderControllers')
router.post('/place-order', orderController.placeOrder);
router.get('/orders/:patientId', orderController.getOrdersByPatient);
router.put('/cancel-order/:id', orderController.cancelOrder);
module.exports = router;
