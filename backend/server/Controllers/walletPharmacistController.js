const Wallet = require('../Models/walletPharmacist');
const pharmacistsModel = require('../Models/pharmacists');

exports.createWallet = async (req, res) => {
  try {
    const { pharmacistsId } = req.params;

    // Check if the wallet already exists for the pharmacists
    const existingWallet = await Wallet.findOne({ pharmacists: pharmacistsId });

    if (existingWallet) {
      return res.status(400).json({ message: 'Wallet already exists for this pharmacists' });
    }

    // Create a new wallet for the pharmacists
    const newWallet = new Wallet({ pharmacists: pharmacistsId, balance: 5000 });
    const savedWallet = await newWallet.save();

    res.status(201).json(savedWallet);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getWallet = async (req, res) => {
  try {
    const { pharmacistsId } = req.params;

    // Find the wallet for the specified pharmacists
    const wallet = await Wallet.findOne({ pharmacists: pharmacistsId });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found for this pharmacists' });
    }

    res.status(200).json(wallet);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateWalletBalance = async (req, res) => {
  try {
    const { pharmacistsId } = req.params;
    const { balance } = req.body;

    // Find and update the wallet balance for the specified pharmacists
    const updatedWallet = await Wallet.findOneAndUpdate(
      { pharmacists: pharmacistsId },
      { balance: balance },
      { new: true }
    );

    if (!updatedWallet) {
      return res.status(404).json({ message: 'Wallet not found for this pharmacists' });
    }

    res.status(200).json(updatedWallet);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.handleWalletRefund = async (req, res) => {
  try {
    const { pharmacistsId, refundAmount } = req.body;

    // Find the wallet for the specified pharmacists
    const wallet = await Wallet.findOne({ pharmacists: pharmacistsId });

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found for this pharmacists' });
    }

    // Refund the amount to the pharmacists's wallet
    wallet.balance += refundAmount;

    // Save the updated wallet
    await wallet.save();

    res.status(200).json({ message: 'Refund processed to pharmacists\'s wallet' });
  } catch (err) {
    res.status(500).json(err);
  }
};
