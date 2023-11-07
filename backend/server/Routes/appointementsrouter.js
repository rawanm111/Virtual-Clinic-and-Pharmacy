const express = require('express');
const router = express.Router();
const appoincontroller = require('../Controllers/appoincontroller');

router.post('/', appoincontroller.createAppointment);
router.get('/available-appointments', appoincontroller.getAvailableAppointments);
router.get('/upcoming-appointments/:id', appoincontroller.getUpcomingAppointments);
router.get('/patient/:id', appoincontroller.getallappointementsPatient);  
router.get('/doctor/:id', appoincontroller.getallappointementsDoctor);    
router.put('/:id', appoincontroller.updateappointements);
router.delete('/:id', appoincontroller.deleteappointement);
router.post('/create-upcoming-appointment', appoincontroller.createUpcomingAppointment);

module.exports = router;