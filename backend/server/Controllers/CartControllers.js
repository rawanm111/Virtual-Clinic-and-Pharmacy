// controllers/cartController.js
const Cart = require('../Models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { patientId, medicationId, quantity } = req.body;

    // Find the patient's cart or create one if it doesn't exist
    let cart = await Cart.findOne({ patientId });

    if (!cart) {
      cart = new Cart({patientId, medications: [] });
    }

    // Check if the medication is already in the cart
    const existingMedication = cart.medications.find(
      (item) => item.medicationId.toString() === medicationId
    );

    if (existingMedication) {
      // If the medication is already in the cart, update its quantity
      existingMedication.quantity += quantity;
    } else {
      // If not, add the medication to the cart
      cart.medications.push({ medicationId, quantity });
    }

    // Save the cart
    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { patientId, medicationId, quantity } = req.body;
     // Find the patient's cart
     const cart = await Cart.findOne({ patientId });

     if (!cart) {
       return res.status(404).json({ message: 'Cart not found' });
     }
 
     // Find the medication in the cart
     const medicationToUpdate = cart.medications.find(
       (item) => item.medicationId.toString() === medicationId
     );
 
     if (!medicationToUpdate) {
       return res.status(404).json({ message: 'Medication not found in the cart' });
     }
 
     // Update the quantity
     medicationToUpdate.quantity = quantity;
 
     // Save the updated cart
     const updatedCart = await cart.save();
 
     res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { patientId, medicationId } = req.body;

    // Find the patient's cart
    const cart = await Cart.findOne({ patientId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the medication to remove
    const medicationIndex = cart.medications.findIndex(
      (item) => item.medicationId.toString() === medicationId
    );

    if (medicationIndex === -1) {
      return res.status(404).json({ message: 'Medication not found in the cart' });
    }

    // Remove the medication from the cart
    cart.medications.splice(medicationIndex, 1);

    // Save the updated cart
    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getCartByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Find the patient's cart
    const cart = await Cart.findOne({ patientId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Return the cart contents
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};


  exports.addAddress = async (req, res) => {
    try {
      const { patientId, address } = req.body;
  
      // Find the patient's cart
      const cart = await Cart.findOne({ patientId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Add the new address to the addresses array in the cart
      cart.addresses.push(address);
  
      // Save the updated cart with the new address
      const updatedCart = await cart.save();
  
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  };
exports.getAddressesByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Find the patient's cart
    const cart = await Cart.findOne({ patientId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Return the list of addresses for the patient
    res.status(200).json(cart.addresses);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.selectMedication = async (req, res) => {
  try {
    const { patientId, medicationId } = req.body;

    // Find the patient's cart
    const cart = await Cart.findOne({ patientId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Update the selected medication for the cart
    cart.selectedMedicationId = medicationId;

    // Save the updated cart with the selected medication
    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateAddress = async (req, res) => {
  try {
    const { patientId, newAddress } = req.body;

    const cart = await Cart.findOne({ patientId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Update the address directly
    cart.pataddress = newAddress;

    const updatedCart = await cart.save();

    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
};
// controllers/cartController.js

// ... (previous methods)

exports.deleteCart = async (req, res) => {
  try {
    const patientId = req.params.patientId;

    // Find and delete the patient's cart
    const deletedCart = await Cart.findOneAndDelete({ patientId });

    if (!deletedCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ message: 'Cart deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};




