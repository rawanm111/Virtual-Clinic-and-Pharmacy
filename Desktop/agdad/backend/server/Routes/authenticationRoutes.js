const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authenticationController');

router.post('/', authController.login);

module.exports = router;