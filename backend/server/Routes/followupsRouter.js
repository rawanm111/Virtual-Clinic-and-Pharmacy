const express = require('express');
const router = express.Router();
const followup = require('../Controllers/followupController');

router.post('/', followup.createFollowup);
router.get('/doctor/:id', followup.getallfollowupsDoctor);
<<<<<<< HEAD
router.delete('/del/:id', followup.deleteFollowup);
=======

>>>>>>> 46deba00d352edab8740c55b567574c095c75be2

module.exports = router;