
const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/OrderControllers')
router.post('/place-order', orderController.placeOrder);
router.get('/orders/:patientId', orderController.getOrdersByPatient);
router.put('/cancel-order/:id', orderController.cancelOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders2', orderController.getAllOrders2);
router.get('/orders/:year/:month', orderController.getAllOrdersByMonth);

module.exports = router;
