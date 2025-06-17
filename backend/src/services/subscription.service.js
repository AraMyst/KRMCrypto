const Subscription = require('../models/Subscription');
const paymentService = require('./payment.service');

// Example prices per plan (in USD)
const planPrices = {
  daily: 5,
  weekly: 10,
  monthly: 20,
};
const DEFAULT_CURRENCY = 'USD';

async function createSubscription(userId, plan) {
  if (!planPrices[plan]) {
    throw new Error('Invalid plan');
  }

  let subscription = await Subscription.findOne({ user: userId });
  if (!subscription) {
    subscription = await Subscription.create({
      user: userId,
      plan,
      status: 'pending',
      startDate: new Date()
    });
  } else {
    subscription.plan = plan;
    subscription.status = 'pending';
    await subscription.save();
  }

  const payment = await paymentService.createCharge({
    userId,
    plan,
    amount: planPrices[plan],
    currency: DEFAULT_CURRENCY
  });

  return { subscription, paymentLink: payment.hostedUrl };
}

async function getSubscriptionByUser(userId) {
  return Subscription.findOne({ user: userId });
}

async function updateSubscription(userId, plan) {
  const subscription = await Subscription.findOneAndUpdate(
    { user: userId },
    { plan },
    { new: true }
  );
  return subscription;
}

async function cancelSubscription(userId) {
  await Subscription.findOneAndUpdate(
    { user: userId },
    { status: 'cancelled' }
  );
}

async function getAllSubscriptions() {
  return Subscription.find().populate('user');
}

async function getSubscriptionById(id) {
  return Subscription.findById(id).populate('user');
}

module.exports = {
  createSubscription,
  getSubscriptionByUser,
  updateSubscription,
  cancelSubscription,
  getAllSubscriptions,
  getSubscriptionById
};
