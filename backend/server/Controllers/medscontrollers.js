const meds = require('../Models/meds.js');

exports.createmeds = async (req, res) => {
  try {
    const newmed = new meds(req.body);
    const savedmed = await newmed.save();
    res.status(201).json(savedmed);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllmeds = async (req, res) => {
  try {
    const findmed = await meds.find();
    res.status(200).json(findmed);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatemeds = async (req, res) => {
  try {
    const updatedmed = await meds.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedmed);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletemeds = async (req, res) => {
  try {
    await meds.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};


// Update medication description
exports.updateDescription = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    // Find the medication by ID and update its description
    const updatedmed = await meds.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (!updatedmed) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(updatedmed);
  } catch (err) {
    console.error('Error updating description:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update medication price
exports.updatePrice = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    // Find the medication by ID and update its price
    const updatedmed = await meds.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );

    if (!updatedmed) {
      return res.status(404).json({ message: 'Medication not found' });
    }

    res.status(200).json(updatedmed);
  } catch (err) {
    console.error('Error updating price:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
