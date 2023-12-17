const Order = require('../Models/Order');
const Cart = require('../Models/Cart');
const meds = require('../Models/meds');
const patients = require('../Models/patients');
const healthPackage = require('../Models/HealthPackage');
const PatientPackages = require('../Models/PatientPackages');
const Wallet = require('../Models/Wallet');

// Create an order for a patient
exports.placeOrder = async (req, res) => {
  
    try {
      const { patientId } = req.body;
      let discount = 1;
      try {
        
        //get the discount for the patient
        const patient = await patients.findById(patientId);
        if (patient) {
          const package1 = await PatientPackages.findOne({ patient: patientId });
          if (package1) {
            const healthPackageItem = await healthPackage.findById(package1.package);
            if (healthPackageItem) {
              discount = healthPackageItem.discountOnMedicineOrders/100;
            }
          }
        } 
      } catch (err) {
        console.log(err);
      }
      // Find the patient's cart
      const cart = await Cart.findOne({ patientId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Extract items and their quantities from the patient's cart
      const orderItems = await Promise.all(cart.medications.map(async (item) => {
        // Fetch the price for each item from your 'meds' model within the OrderController
        const medication = await meds.findById(item.medicationId);
  
        if (!medication) {
          // Handle the case where medication is not found
          return {
            medicationId: item.medicationId,
            quantity: item.quantity,
            price: 0,
            name:"", // Set a default price or handle the error accordingly
          };
        }
  
        return {
          medicationId: item.medicationId,
          quantity: item.quantity,
          price: medication.price*discount,
          name: medication.name, // Use the fetched price
        };
      }));
  
      // Create the order
      const order = new Order({
        patientId,
        cartId: cart._id,
        items: orderItems,
        address: cart.pataddress,
        status: 'pending',

        // Add other order details if needed
      });
      order.createdAt = new Date();
      // Save the order
      const savedOrder = await order.save();
  
      // You can choose to clear the patient's cart here if necessary
  
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  };
// Get orders for a specific patient by patientId
exports.getOrdersByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find orders for the specified patient
    const orders = await Order.find({ patientId });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};
// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
  }catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Find all orders
    const orders = await Order.find();

    res.status(200).json(orders);

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order cannot be canceled' });
    }

    // Fetch the patient associated with the order
    const patient = await patients.findById(order.patientId);

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
  


exports.getAllOrdersByMonth = async (req, res) => {
  try {
    const { year, month } = req.params;

    // Calculate the start and end dates for the specified month
    const startDate = new Date(`${year}-${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    // Find orders within the specified month
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lt: endDate },
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error(`Error fetching orders by month: ${err}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};