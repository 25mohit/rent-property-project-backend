const mongoose = require('mongoose');

const whishlistSchema =  mongoose.Schema({
    uID: String,
    lID: String,
    sID: String,
    listingData:{
        
    }
}, {timestamps: true});

const WhishList = mongoose.model('whishlist', whishlistSchema);

module.exports = WhishList;
