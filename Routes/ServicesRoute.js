const express = require('express');
const { AddNewItemController, GetNotification, AddListingToWhishlist, GetWhishlistListing, RemoveWhishlist } = require('../Controllers/ServicesController');
const router = express.Router();

// Register a new user
router.post('/add-new-item', AddNewItemController);
router.get('/get-notification', GetNotification);
router.post('/add-whishlist', AddListingToWhishlist);
router.get('/get-whishlist-list', GetWhishlistListing);
router.delete('/remove-whishlist', RemoveWhishlist);

module.exports = router;
