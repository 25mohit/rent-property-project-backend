const mongoose = require('mongoose');

const notificationSchema =  mongoose.Schema({
  label: String,
  type: String,
  fresh: Boolean,
  id: String
}, {timestamps: true});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
