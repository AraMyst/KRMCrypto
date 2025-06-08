// services/payment.service.js
const { resources } = require('../config/paymentGateway');
const Payment = require('../models/Payment');

async function createCharge({ userId, plan, amount, currency }) {
  // amount já vem convertido no frontend para a currency do usuário
  const chargeData = {
    name:        `Assinatura: ${plan}`,
    description: `Subscrição ${plan}`,
    local_price: { amount: amount.toFixed(2), currency },
    pricing_type:'fixed_price'
  };

  const charge = await resources.Charge.create(chargeData);

  const payment = await Payment.create({
    user:      userId,
    plan,
    amount,
    currency,
    chargeId:  charge.id,
    hostedUrl: charge.hosted_url,
    status:    charge.timeline.slice(-1)[0].status.toUpperCase()
  });

  return payment;
}

async function getChargeStatus(chargeId) {
  const charge = await resources.Charge.retrieve(chargeId);
  return charge.timeline.slice(-1)[0].status.toUpperCase();
}

async function updatePaymentStatus(chargeId) {
  const payment = await Payment.findOne({ chargeId });
  if (!payment) throw new Error('Pagamento não encontrado');
  const status = await getChargeStatus(chargeId);
  payment.status = status;
  await payment.save();
  return payment;
}

module.exports = {
  createCharge,
  getChargeStatus,
  updatePaymentStatus
};
