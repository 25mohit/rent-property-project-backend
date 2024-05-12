const express = require('express');
const { RegisterUser, LoginUser, UpdateProfile } = require('../Controllers/UserController');
const router = express.Router();

router.post('/register', RegisterUser);
router.post('/secure-login', LoginUser);
router.put('/update-profile', UpdateProfile);

module.exports = router;
