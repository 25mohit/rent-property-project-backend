const express = require('express');
const { CheckEmailRecord, VerifyOTP, ForgotPassword, UpdatePassword } = require('../Controllers/UtilsController');
const router = express.Router();

router.post('/check-email', CheckEmailRecord)
router.post('/verify-otp', VerifyOTP)
router.post('/forgot-password', ForgotPassword)
router.put('/update-password', UpdatePassword)

module.exports = router;
