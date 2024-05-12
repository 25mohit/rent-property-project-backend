const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const itemSchema =  mongoose.Schema({
  id: String,
  email: String,
  user_name: String,
  item_name: String,
  item_category: String,
  item_sub_category: String,
  item_description: String,
  item_location:{
    state: String,
    district: String,
    pincode: String,
    address: String,
  },
  contact_name: String,
  contact_mobile: Number,
  status: {
    type: String,
    default: 'draft'
  },
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
}
}, {timestamps: true});

const NewListing = mongoose.model('listing', itemSchema);

module.exports = NewListing;
