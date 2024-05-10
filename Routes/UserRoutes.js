const express = require('express');
const { RegisterUser, LoginUser } = require('../Controllers/UserController');
const router = express.Router();

// Register a new user
router.post('/register', RegisterUser);
router.post('/secure-login', LoginUser);

module.exports = router;
