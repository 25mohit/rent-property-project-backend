const express = require('express');
const { AddNewItemController, GetNotification, AddListingToWhishlist, GetWhishlistListing } = require('../Controllers/ServicesController');
const router = express.Router();

// Register a new user
router.post('/add-new-item', AddNewItemController);
router.get('/get-notification', GetNotification);
router.post('/add-whishlist', AddListingToWhishlist);
router.get('/get-whishlist-list', GetWhishlistListing);

module.exports = router;
