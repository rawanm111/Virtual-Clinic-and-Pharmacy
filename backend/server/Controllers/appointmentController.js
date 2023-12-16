const mongoose= require('mongoose');
const appointement = require('../Models/appointements');
const patients = require('../Models/patients');
const Notif=require('../Models/notif');

exports.createAppointment = async (req, res) => {
  try {
    const newapp = new appointement(req.body);
    const savedapp = await newapp.save();
    res.status(201).json(savedapp);
  } catch (err) {
    res.status(500).json(err);
  }
};

async function createNotification(receiver, time, content, title) {
  try {
    const newNotification = new Notification({
      receiver,
      time,
      content,
      title
    });

    return await newNotification.save();
  } catch (err) {
    throw new Error('Error creating notification: ' + err.message);
  }
}

// exports.getallNoificationsPatient = async (req, res) => {
//   try {
//     const patientId = req.params.receiver;
//     const patientnotif = await Notification.find({ receiver: patientId })
      
//     res.status(200).json(patientnotif);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// exports.getallNoificationsPatient = async (req, res) => {
//   try {
//     const patientId = req.params.id;

//     // Find all notifications where the receiver is the specified patient ID
//     const patientNotifications = await Notification.find({ receiver: patientId });

//     res.status(200).json(patientNotifications);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getallappointementsPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patientAppointments = await appointement.find({ patient: patientId })
      .populate('doctor'); 
    res.status(200).json(patientAppointments);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.confirmation = async (req, res) => {
  try {
    const patientId = req.params.id;
    // Ensure the patient exists
    const patientExists = await patients.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Find the most recent appointment for this patient, sorted by appointment ID
    const lastAppointment = await appointement.findOne({ patient: patientId })
      .sort({ _id: -1 })
      .populate('doctor');

    if (!lastAppointment) {
      return res.status(404).json({ message: 'No appointments found for this patient' });
    }

    res.status(200).json(lastAppointment);
  } catch (err) {
    res.status(500).json(err);
  }
};



exports.getallappointementsDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const doctorAppointments = await appointement.find({ doctor: doctorId })
      .populate('patient'); 
    res.status(200).json(doctorAppointments);
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
    const doctorId = req.params.id; 
    const currentDate = new Date();

    const upcomingAppointments = await appointement
      .find({ doctor: doctorId, date: { $gte: currentDate } })
      .populate('patient')
      .select('doctor patient date');

    res.status(200).json(upcomingAppointments);
  } catch (err) {
    res.status(500).json(err);
  }
};
 

exports.getAvailableAppointments = async (req, res) => {
  try {
    const availableAppointments = await appointement.find({ status: "Available" }).populate('doctor'); ;
    res.status(200).json(availableAppointments);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUpcomingAppointment = async (req, res) => {
  try {
    const { doctor, patientName, date } = req.body;
    const patient = await patients.findOne({ fullName: patientName });
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found' });
    }
    const newAppointment = new appointement({
      doctor: doctor,
      patient: patient._id,
      status: 'Upcoming', 
      date: new Date(date),
    });
    const savedAppointment = await newAppointment.save();
    const newNotification = new Notification({
      receiver: patient._id, // Assuming you want to notify the patient
      time: new Date(), // Current time as the notification time
      content: `You have an appointment with ${appointment.doctor.name} on ${appointment.date}`, // Customize this message as needed
      title: 'Confirmed', // Or use a relevant title from your enum
    });
    const trendNotification=await newNotification.save();


    res.status(201).json({ appointment: savedAppointment, Notification: trendNotification });

  } catch (err) {
    res.status(500).json(err);
  }
};


// exports.getlastappointement = async (req, res) => {
//   try {
//     // Retrieve the patient ID from the request body
//     const patientId = req.body.id;

//     if (!patientId) {
//       return res.status(400).json({ message: "Patient ID is required" });
//     }

//     // Query to find the last appointment and populate both patient and doctor
//     const lastPatientAppointment = await appointement.findOne({ patient: patientId })
//       .sort({ date: -1 }) // Assuming 'date' is the field to sort by
//       .populate('patient') // Populating patient information
//       .populate('doctor'); // Populating doctor information

//     // Check if an appointment was found
//     if (lastPatientAppointment) {
//       res.status(200).json(lastPatientAppointment);

//       // Create a notification for the patient
//       const patientNotif = new Notif({
//         receiver: patientId,
//         onModel: 'patients',
//         title: 'Confirmed',
//         content: {
//           patientUsername: lastPatientAppointment.patient.username, // Now it should be populated
//           doctorUsername: lastPatientAppointment.doctor.username,
//           appointmentTime: lastPatientAppointment.date
//         }
//       });

//       // Create a notification for the doctor
//       const doctorNotif = new Notif({
//         receiver: lastPatientAppointment.doctor._id,
//         onModel: 'doctors',
//         title: 'Confirmed',
//         content: {
//           patientUsername: lastPatientAppointment.patient.username, // Now it should be populated
//           doctorUsername: lastPatientAppointment.doctor.username,
//           appointmentTime: lastPatientAppointment.date
//         }
//       });

//       // Save the notifications
//       await patientNotif.save();
//       await doctorNotif.save();

//     } else {
//       res.status(404).json({ message: "No appointments found for this patient" });
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
const nodemailer = require('nodemailer');

// NodeMailer transporter configuration
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'Marwantest70@gmail.com',
    pass: 'zech uxtr bhsu zbec'
  }
});

exports.getlastappointement = async (req, res) => {
  try {
    const patientId = req.body.id;
    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const lastPatientAppointment = await appointement.findOne({ patient: patientId })
      .sort({ date: -1 })
      .populate('patient')
      .populate('doctor');

    if (lastPatientAppointment) {
      res.status(200).json(lastPatientAppointment);

      const patientNotif = new Notif({
        receiver: patientId,
        onModel: 'patients',
        title: 'Confirmed',
        content: {
          patientUsername: lastPatientAppointment.patient.username,
          doctorUsername: lastPatientAppointment.doctor.username,
          appointmentTime: lastPatientAppointment.date
        }
      });

      const doctorNotif = new Notif({
        receiver: lastPatientAppointment.doctor._id,
        onModel: 'doctors',
        title: 'Confirmed',
        content: {
          patientUsername: lastPatientAppointment.patient.username,
          doctorUsername: lastPatientAppointment.doctor.username,
          appointmentTime: lastPatientAppointment.date
        }
      });

      await patientNotif.save();
      await doctorNotif.save();

      // Prepare and send email to the patient
      const patientEmailContent = `Dear ${lastPatientAppointment.patient.username},\n\nYour appointment is confirmed.\nDoctor: ${lastPatientAppointment.doctor.username}\nTime: ${lastPatientAppointment.date}`;
      transporter.sendMail({
        from: 'Marwantest70@gmail.com',
        to: lastPatientAppointment.patient.email, // Assuming patient's email is available
        subject: 'Appointment Confirmation',
        text: patientEmailContent
      });

      // Prepare and send email to the doctor
      const doctorEmailContent = `Dear ${lastPatientAppointment.doctor.username},\n\nYou have a confirmed appointment.\nPatient: ${lastPatientAppointment.patient.username}\nTime: ${lastPatientAppointment.date}`;
      transporter.sendMail({
        from: 'Marwantest70@gmail.com',
        to: lastPatientAppointment.doctor.email, // Assuming doctor's email is available
        subject: 'Appointment Confirmation',
        text: doctorEmailContent
      });

    } else {
      res.status(404).json({ message: "No appointments found for this patient" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// notificationsController.js


exports.getNotificationsByReceiver = async (req, res) => {
    try {
        const receiverId = req.params.receiverId;
        const notifications = await Notif.find({ receiver: receiverId });
        res.json(notifications);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.cancelAppointment = async (req, res) => {
  try {
    // Extract appointment ID from request parameters
    const appointmentId = req.params.id;

    // Check if the appointment exists
    const appointment = await appointement.findById(appointmentId);

    // if (!appointment) {
    //   return res.status(404).json({ message: 'Appointment not found' });
    // }

    // Update the appointment's status to "cancelled"
    appointment.status = 'Cancelled';

    // Save the updated appointment
    const updatedAppointment = await appointment.save();

    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(500).json(err);
  }
}; exports.rescheduleAppointment = async (req, res) => {
  try {
    // Extract appointment ID and new date from request parameters and body
    const appointmentId = req.params.id;
    const newDate = new Date(req.body.newDate); // Assuming the new date is provided in the request body

    // Check if the appointment exists
    const appointment = await appointement.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update the appointment's status to "Rescheduled" and set the new date
    appointment.status = 'Rescheduled';
    appointment.date = newDate;

    // Save the updated appointment
    const updatedAppointment = await appointment.save();

    res.status(200).json(updatedAppointment);
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.cancelledNotif = async (req, res) => {
  try {
    // Find the last appointment with status "Cancelled"
    const lastCancelledAppointment = await appointement.findOne({ status: 'Cancelled' })
      .sort({ date: -1 })
      .populate('patient')
      .populate('doctor');
    
    if (!lastCancelledAppointment) {
      return res.status(404).json({ message: "No cancelled appointments found" });
    }

    // Create and save notifications for both patient and doctor
    const patientNotif = new Notif({
      receiver: lastCancelledAppointment.patient.id,
      onModel: 'patients',
      title: 'Cancelled',
      content: {
        patientUsername: lastCancelledAppointment.patient.username,
        doctorUsername: lastCancelledAppointment.doctor.username,
        appointmentTime: lastCancelledAppointment.date
      }
    });

    const doctorNotif = new Notif({
      receiver: lastCancelledAppointment.doctor.id,
      onModel: 'doctors',
      title: 'Cancelled',
      content: {
        patientUsername: lastCancelledAppointment.patient.username,
        doctorUsername: lastCancelledAppointment.doctor.username,
        appointmentTime: lastCancelledAppointment.date
      }
    });

    await patientNotif.save();
    await doctorNotif.save();

    // Prepare and send email to the patient
    const patientEmailContent = `Dear ${lastCancelledAppointment.patient.username},\n\nYour appointment has been cancelled.\nDoctor: ${lastCancelledAppointment.doctor.username}\nTime: ${lastCancelledAppointment.date}`;
    transporter.sendMail({
      from: 'Marwantest70@gmail.com',
      to: lastCancelledAppointment.patient.email,
      subject: 'Appointment Cancellation',
      text: patientEmailContent
    });

    // Prepare and send email to the doctor
    const doctorEmailContent = `Dear ${lastCancelledAppointment.doctor.username},\n\nAn appointment has been cancelled.\nPatient: ${lastCancelledAppointment.patient.username}\nTime: ${lastCancelledAppointment.date}`;
    transporter.sendMail({
      from: 'Marwantest70@gmail.com',
      to: lastCancelledAppointment.doctor.email,
      subject: 'Appointment Cancellation',
      text: doctorEmailContent
    });

    res.status(200).json({ message: "Notifications and emails sent for the last cancelled appointment" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

exports.rescheduledNotif = async (req, res) => {
  try {
    // Find the last appointment with status "Cancelled"
    const lastCancelledAppointment = await appointement.findOne({ status: 'Rescheduled' })
      .sort({ date: -1 })
      .populate('patient')
      .populate('doctor');
    
    if (!lastCancelledAppointment) {
      return res.status(404).json({ message: "No Rescheduled appointments found" });
    }
    console.log(lastCancelledAppointment);
    // Create and save notifications for both patient and doctor
    const patientNotif = new Notif({
      receiver: lastCancelledAppointment.patient.id,
      onModel: 'patients',
      title: 'Rescheduled',
      content: {
        patientUsername: lastCancelledAppointment.patient.username,
        doctorUsername: lastCancelledAppointment.doctor.username,
        appointmentTime: lastCancelledAppointment.date
      }
    });

    const doctorNotif = new Notif({
      receiver: lastCancelledAppointment.doctor.id,
      onModel: 'doctors',
      title: 'Rescheduled',
      content: {
        patientUsername: lastCancelledAppointment.patient.username,
        doctorUsername: lastCancelledAppointment.doctor.username,
        appointmentTime: lastCancelledAppointment.date
      }
    });

    await patientNotif.save();
    await doctorNotif.save();

    // Prepare and send email to the patient
    const patientEmailContent = `Dear ${lastCancelledAppointment.patient.username},\n\nYour appointment has been Rescheduled.\nDoctor: ${lastCancelledAppointment.doctor.username}\nTime: ${lastCancelledAppointment.date}`;
    transporter.sendMail({
      from: 'Marwantest70@gmail.com',
      to: lastCancelledAppointment.patient.email,
      subject: 'Appointment Rescheduled',
      text: patientEmailContent
    });

    // Prepare and send email to the doctor
    const doctorEmailContent = `Dear ${lastCancelledAppointment.doctor.username},\n\nAn appointment has been Rescheduled.\nPatient: ${lastCancelledAppointment.patient.username}\nTime: ${lastCancelledAppointment.date}`;
    transporter.sendMail({
      from: 'Marwantest70@gmail.com',
      to: lastCancelledAppointment.doctor.email,
      subject: 'Appointment Rescheduled',
      text: doctorEmailContent
    });

    res.status(200).json({ message: "Notifications and emails sent for the last Rescheduled appointment" });
  } catch (err) {
    res.status(500).json(err);
  }
};
