// models/Subscription.js
const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  plan: {
    type: String,
    required: true,
    enum: [
      'diario',
      'semanal',
      'quinzenal',
      'mensal',
      'bimestral',
      'trimestral'
    ]
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'cancelled'],
    default: 'pending'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  // opcional, para controlar próxima cobrança
  nextBillingDate: {
    type: Date
  },
  // se for preciso armazenar o ID do gateway de pagamento
  paymentGatewayId: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
