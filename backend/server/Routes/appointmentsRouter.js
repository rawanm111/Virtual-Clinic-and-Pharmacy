const express = require('express');
const router = express.Router();
const appoincontroller = require('../Controllers/appointmentController');
router.get('/notifications/cancelled', appoincontroller.cancelledNotif);
router.get('/notifications/rescheduled', appoincontroller.rescheduledNotif);
<<<<<<< HEAD
=======
router.get('/notifications/accepted', appoincontroller.acceptedNotif);
router.get('/notifications/rejected', appoincontroller.rejectedNotif);
>>>>>>> origin/main
router.post('/', appoincontroller.createAppointment);
router.get('/available-appointments', appoincontroller.getAvailableAppointments);
router.get('/upcoming-appointments/:id', appoincontroller.getUpcomingAppointments);
router.get('/patient/:id', appoincontroller.getallappointementsPatient);
router.get('/confirmation/:id', appoincontroller.confirmation);  
router.get('/doctor/:id', appoincontroller.getallappointementsDoctor);    
router.put('/:id', appoincontroller.updateappointements);
router.delete('/:id', appoincontroller.deleteappointement);
router.post('/create-upcoming-appointment', appoincontroller.createUpcomingAppointment);
router.post('/lastAppointment', appoincontroller.getlastappointement);
router.get('/receiver/:receiverId', appoincontroller.getNotificationsByReceiver);
<<<<<<< HEAD
=======
router.put('/:id/cancel', appoincontroller.cancelAppointment);
// Define a route to cancel an appointment
>>>>>>> origin/main
router.put('/:id/cancel', appoincontroller.cancelAppointment);
router.put('/:id/reschedule', appoincontroller.rescheduleAppointment);

module.exports = router;