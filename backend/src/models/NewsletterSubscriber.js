// models/NewsletterSubscriber.js
const mongoose = require('mongoose');

const NewsletterSubscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
