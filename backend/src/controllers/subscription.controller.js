// controllers/subscription.controller.js

const subscriptionService = require('../services/subscription.service');

exports.createSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body; // ex: 'diario', 'semanal', ...
    const { subscription, paymentLink } = await subscriptionService.createSubscription(userId, plan);
    res.status(201).json({ subscription, paymentLink });
  } catch (err) {
    next(err);
  }
};

exports.getMySubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const subscription = await subscriptionService.getSubscriptionByUser(userId);
    if (!subscription) {
      return res.status(404).json({ message: 'Assinatura não encontrada.' });
    }
    res.json({ subscription });
  } catch (err) {
    next(err);
  }
};

exports.updateSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { plan } = req.body;
    const updated = await subscriptionService.updateSubscription(userId, plan);
    res.json({ subscription: updated });
  } catch (err) {
    next(err);
  }
};

exports.cancelSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await subscriptionService.cancelSubscription(userId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// ====== Admin Routes ======

exports.getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await subscriptionService.getAllSubscriptions();
    res.json({ subscriptions });
  } catch (err) {
    next(err);
  }
};

exports.getSubscriptionById = async (req, res, next) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Assinatura não encontrada.' });
    }
    res.json({ subscription });
  } catch (err) {
    next(err);
  }
};
