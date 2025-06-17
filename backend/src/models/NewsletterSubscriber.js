// models/NewsletterSubscriber.js
const mongoose = require('mongoose');

const NewsletterSubscriberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  // pending = ainda não confirmado; subscribed = confirmado; unsubscribed = cancelou
  status: {
    type: String,
    enum: ['pending', 'subscribed', 'unsubscribed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('NewsletterSubscriber', NewsletterSubscriberSchema);
