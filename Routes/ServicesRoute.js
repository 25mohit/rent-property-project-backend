const express = require('express');
const { AddNewItemController, GetNotification, AddListingToWhishlist } = require('../Controllers/ServicesController');
const router = express.Router();

// Register a new user
router.post('/add-new-item', AddNewItemController);
router.get('/get-notification', GetNotification);
router.post('/add-whishlist', AddListingToWhishlist);

module.exports = router;
