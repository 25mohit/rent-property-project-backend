const mongoose = require('mongoose');

const otpSchema =  mongoose.Schema({
  otp: String,
  validTill: Date,
  email: String
}, {timestamps: true});

const Otp = mongoose.model('otp', otpSchema);

module.exports = Otp;
