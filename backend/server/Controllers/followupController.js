const mongoose= require('mongoose');
const followup = require('../Models/followups');

exports.createFollowup = async (req, res) => {
    try {
      const newfollowup = new followup(req.body);
      const savedfollowup = await newfollowup.save();
      res.status(201).json(savedfollowup);
    } catch (err) {
      res.status(500).json(err);
    }
  };

 exports.getallfollowupsDoctor = async (req, res) => {
    try {
      const doctorId = req.params.id;
      const doctorFollowups = await followup.find({ doctor: doctorId })
        .populate('patient'); 
      res.status(200).json(doctorFollowups);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  