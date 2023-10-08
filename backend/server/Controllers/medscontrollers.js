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