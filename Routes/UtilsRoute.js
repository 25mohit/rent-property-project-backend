const express = require('express');
const { CheckEmailRecord, VerifyOTPForRegisteration } = require('../Controllers/UtilsController');
const router = express.Router();

router.post('/check-email', CheckEmailRecord)
router.post('/verify-register-otp', VerifyOTPForRegisteration)

module.exports = router;
