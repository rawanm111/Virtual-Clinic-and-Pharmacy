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
<<<<<<< HEAD
  exports.deleteFollowup = async (req, res) => {
    try {
      const followupId = req.params.id;
      const deletedFollowup = await followup.findByIdAndDelete(followupId);
      if (!deletedFollowup) {
        return res.status(404).json({ message: 'Followup not found' });
      }
      res.status(200).json({ message: 'Followup deleted successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  };
=======
  
>>>>>>> 46deba00d352edab8740c55b567574c095c75be2
