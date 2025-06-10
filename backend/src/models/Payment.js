// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan:        {
                  type: String,
                  enum: ['daily','weekly','biweekly','monthly','bimonthly','quarterly'],
                  required: true
                },
  amount:      { type: Number, required: true },     // valor em local currency
  currency:    { type: String, required: true },     // ex: 'BRL','USD' etc
  chargeId:    { type: String, required: true, unique: true },
  hostedUrl:   { type: String, required: true },     // onde o usuário paga
  status:      {
                  type: String,
                  enum: ['NEW','PENDING','COMPLETED','EXPIRED','UNRESOLVED'],
                  default: 'NEW'
               },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
