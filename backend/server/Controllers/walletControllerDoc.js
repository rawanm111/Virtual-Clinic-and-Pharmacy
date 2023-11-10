const Wallet = require('../Models/walletDoc');

exports.createWallet = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Check if the wallet already exists for the patient
    const existingWallet = await Wallet.findOne({ doctor: doctorId });

    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet already exists for this patient' });
    }

    // Create a new wallet for the patient
    const newWallet = new Wallet({ doctor: doctorId,balance:5000 });
    const savedWallet = await newWallet.save();

    res.status(201).json(savedWallet);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getWallet = async (req, res) => {
  try {
    const { doctorId } = req.params;

    // Find the wallet for the specified patient
    const wallet = await Wallet.findOne({ doctor: doctorId });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found for this patient' });
    }

    res.status(200).json(wallet);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateWalletBalance = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { balance } = req.body;

    // Find and update the wallet balance for the specified patient
    const updatedWallet = await Wallet.findOneAndUpdate(
      { doctor: doctorId },
      { balance: balance },
      { new: true }
    );

    if (!updatedWallet) {
      return res.status(404).json({ message: 'Wallet not found for this patient' });
    }

    res.status(200).json(updatedWallet);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.handleWalletPayment = async (req, res) => {
  try {
    const { appointmentId, userId } = req.body;

    // Fetch user's wallet balance from the database
    const user = await userModel.findById(userId);
    const walletBalance = user.walletBalance;

    // You may need to fetch the appointment price from the database
    const appointmentPrice = 200; 

    // Check if the user has sufficient balance
    if (walletBalance >= appointmentPrice) {
      // Deduct the price from the user's wallet balance
      const updatedWalletBalance = walletBalance - appointmentPrice;

      // Update the user's wallet balance in the database
      await userModel.findByIdAndUpdate(userId, { walletBalance: updatedWalletBalance });

      console.log(`Wallet payment successful for appointment ${appointmentId} by user ${userId}`);
      res.status(200).json({ message: 'Wallet payment successful' });
    } else {
      // Insufficient balance
      res.status(400).json({ message: 'Insufficient wallet balance' });
    }
  } catch (error) {
    console.error('Error processing wallet payment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
