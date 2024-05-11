const express = require('express');
const { AddNewItemController } = require('../Controllers/ServicesController');
const router = express.Router();

// Register a new user
router.post('/add-new-item', AddNewItemController);

module.exports = router;
