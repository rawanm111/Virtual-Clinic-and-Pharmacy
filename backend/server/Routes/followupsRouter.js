const express = require('express');
const router = express.Router();
const followup = require('../Controllers/followupController');

router.post('/', followup.createFollowup);
router.get('/doctor/:id', followup.getallfollowupsDoctor);
router.delete('/del/:id', followup.deleteFollowup);


module.exports = router;