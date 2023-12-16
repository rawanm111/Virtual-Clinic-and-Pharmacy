const mongoose= require('mongoose');
const Notification = require('../Models/notifications');

  
exports.getPharmNotifications = async (req, res) => {
    try {
      const pharmNotifications = await Notification.find({ receiver: 'Pharm' });
      res.status(200).json(pharmNotifications);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  exports.addNotificationPharm = async (req, res) => {
    try {
      const {  content } = req.body; // Assuming you pass receiver and content in the request body
  
      // Validate receiver value if needed
  
      const newNotification = new Notification({
        receiver: 'Pharm',
        time: new Date(),
        content: `${content} is out of stock`,
        title: 'Confirmed', // Set the title to 'Confirmed'
      });
  
      await newNotification.save();
      res.status(201).json(newNotification);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // exports.lastappod = async (req, res) => {
  //   try {
  //     const patientId = req.params.id;
  //     // Ensure the patient exists
  //     const patientExists = await patients.findById(patientId);
  //     if (!patientExists) {
  //       return res.status(404).json({ message: 'Patient not found' });
  //     }
  
  //     // Find the most recent appointment for this patient, sorted by appointment ID
  //     const lastAppointment = await appointement.findOne({ patient: patientId })
  //       .sort({ _id: -1 })
  //       .populate('doctor');
  
  //     if (!lastAppointment) {
  //       return res.status(404).json({ message: 'No appointments found for this patient' });
  //     }
  
  //     res.status(200).json(lastAppointment);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // };