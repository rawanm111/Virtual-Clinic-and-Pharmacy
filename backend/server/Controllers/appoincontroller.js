const appointement = require('../models/appointements');

exports.createappointement = async (req, res) => {
  try {
    const newapp = new appointement(req.body);
    const savedapp = await newapp.save();
    res.status(201).json(savedapp);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getallappointements = async (req, res) => {
  try {
    const findapp = await appointement.find();
    res.status(200).json(findapp);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateappointements = async (req, res) => {
  try {
    const updatedapp = await appointement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedapp);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteappointement = async (req, res) => {

  try {
    await appointement.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json(err);
  }
};



exports.getUpcomingAppointments = async (req, res) => {
  try {
    const currentDate = new Date();

    const upcomingAppointments = await appointement
      .find({ date: { $gte: currentDate } })
      .select('did pid date'); 

    res.status(200).json(upcomingAppointments);
  } catch (err) {
    res.status(500).json(err);
  }
};