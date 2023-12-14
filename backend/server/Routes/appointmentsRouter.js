const express = require('express');
const router = express.Router();
const appoincontroller = require('../Controllers/appointmentController');

router.post('/', appoincontroller.createAppointment);
router.get('/available-appointments', appoincontroller.getAvailableAppointments);
router.get('/upcoming-appointments/:id', appoincontroller.getUpcomingAppointments);
router.get('/patient/:id', appoincontroller.getallappointementsPatient);  
router.get('/doctor/:id', appoincontroller.getallappointementsDoctor);    
router.put('/:id', appoincontroller.updateappointements);
router.delete('/:id', appoincontroller.deleteappointement);
router.post('/create-upcoming-appointment', appoincontroller.createUpcomingAppointment);
// Define a route to cancel an appointment
router.put('/:id/cancel', appoincontroller.cancelAppointment);
// Define a route to reschedule an appointment
router.put('/:id/reschedule', appoincontroller.rescheduleAppointment);

module.exports = router;