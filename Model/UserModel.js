const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema =  mongoose.Schema({
  fullName:String,
  email: String,
  password: String,
  mobileNo: String,
  referCode: String,
  uuid: {
      type: String,
      default: uuidv4,
      unique: true
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;
