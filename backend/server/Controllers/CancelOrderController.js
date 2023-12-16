// cancelOrderController.js
const Order = require('../Models/Order');
const Wallet = require('../Models/Wallet');
const patientModel = require('../Models/patients');

exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order cannot be canceled' });
    }

    // Fetch the patient associated with the order
    const patient = await patientModel.findById(order.patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Fetch the patient's wallet
    const wallet = await Wallet.findOne({ patient: patient._id });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found for this patient' });
    }

    // Refund the order amount to the patient's wallet
    const refundAmount = calculateRefundAmount(order.items);

    // Add the order items back to the wallet's items array
    wallet.items.push(...order.items.map(item => item.medicationId));

    // Update the wallet balance
    wallet.balance += refundAmount;

    // Update the order status to "canceled"
    order.status = 'canceled';

    // Save the updated wallet and order
    await Promise.all([wallet.save(), order.save()]);

    res.status(200).json({ message: 'Order canceled and refund processed', refundAmount });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Helper function to calculate the refund amount based on order items
function calculateRefundAmount(items) {
  return items.reduce((totalRefund, item) => totalRefund + item.price * item.quantity, 0);
}
