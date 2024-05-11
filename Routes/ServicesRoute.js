const express = require('express');
const { AddNewItemController, CreateNotification } = require('../Controllers/ServicesController');
const router = express.Router();

// Register a new user
router.post('/add-new-item', AddNewItemController);
router.get('/get-notification', CreateNotification);

module.exports = router;
