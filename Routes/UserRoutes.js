// Routes.js

const express = require('express');
const { RegisterUser } = require('../Controllers/UserController');
const router = express.Router();

// Register a new user
router.post('/register', RegisterUser);

module.exports = router;
