const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const whishlistSchema =  mongoose.Schema({
    uID: String,
    lID: String,
    sID: String,
    listingData:{
        thumbnail: String,
        price: Number,
        location: String,
        title: String
    },
    uuid: {
        type: String,
        default: uuidv4,
        unique: true
    }
}, {timestamps: true});

const WhishList = mongoose.model('whishlist', whishlistSchema);

module.exports = WhishList;
