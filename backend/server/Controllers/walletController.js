const Wallet = require('../Models/Wallet');
const appointmentModel = require('../Models/appointements');
const patientsModel = require('../Models/patients');
exports.createWallet = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check if the wallet already exists for the patient
    const existingWallet = await Wallet.findOne({ patient: patientId });

    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet already exists for this patient' });
    }

    // Create a new wallet for the patient
    const newWallet = new Wallet({ patient: patientId,balance:5000 });
    const savedWallet = await newWallet.save();

    res.status(201).json(savedWallet);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getWallet = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find the wallet for the specified patient
    const wallet = await Wallet.findOne({ patient: patientId });

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
    const { patientId } = req.params;
    const { balance } = req.body;
    // Find and update the wallet balance for the specified patient
    const updatedWallet = await Wallet.findOneAndUpdate(
      { patient: patientId },
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
exports.refundPatient = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    // Fetch the appointment and patient details from the database
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    const patientId = appointment.patient._id;
    const patient = await patientsModel.findById(patientId);
    const wallet = await Wallet.findOne({ patient: patientId });
      const walletBalance = wallet.balance;
    // You may need to fetch the appointment cancellation fee from the database or the appointment itself
    const cancellationFee = appointment.cancellationFee || 200; // Assuming a default value
    console.log("hi");
     console.log(cancellationFee);
    // Refund the cancellation fee to the patient's wallet
    const updatedWalletBalance = walletBalance + cancellationFee;
   
    // Find and update the wallet balance for the specified patient
    const updatedWallet = await Wallet.findOneAndUpdate(
      { patient: patientId },
      { balance: updatedWalletBalance },
      { new: true }
    );

    if (!updatedWallet) {
      return res.status(404).json({ message: 'Wallet not found for this patient' });
    }
    // Update the patient's wallet balance in the database
    //await patientsModel.findByIdAndUpdate(patientId, { walletBalance: updatedWalletBalance });

    console.log(`Refund successful for cancelled appointment ${appointmentId} to patient ${patientId}`);
    res.status(200).json({ message: 'Refund successful' });
  } catch (error) {
    console.error('Error processing refund:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};