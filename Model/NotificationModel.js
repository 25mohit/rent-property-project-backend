const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const notificationSchema =  mongoose.Schema({
  label: String,
  type: String,
  fresh: Boolean,
  id: String,
  uuid: {
    type: String,
    default: uuidv4,
    unique: true
}
}, {timestamps: true});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
