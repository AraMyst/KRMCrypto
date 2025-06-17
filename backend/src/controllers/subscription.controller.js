// controllers/subscription.controller.js

const subscriptionService = require('../services/subscription.service');

exports.createSubscription = async (req, res, next) => {
  const { plan } = req.body; // e.g. 'daily', 'weekly', ...

  // --- VERIFICAÇÃO ADICIONADA ---
  const allowedPlans = ['daily', 'weekly', 'monthly'];

  // Verifica se o 'plan' recebido NÃO está na lista de planos permitidos
  // A verificação '!plan' garante que o campo não foi enviado vazio ou nulo.
  if (!plan || !allowedPlans.includes(plan)) {
    // Se não estiver, retorna um erro 400 (Bad Request) com uma mensagem clara.
    return res.status(400).json({
      error: `Plano inválido. Por favor, escolha uma das seguintes opções: ${allowedPlans.join(', ')}.`
    });
  }
  // --- FIM DA VERIFICAÇÃO ---

  try {
    const userId = req.user.id;
    // Se a execução chegou até aqui, o 'plan' é válido.
    const { subscription, paymentLink } = await subscriptionService.createSubscription(userId, plan);
    res.status(201).json({ subscription, paymentLink });
  } catch (err) {
    // Se ocorrer um erro no serviço ou no banco de dados, ele será capturado aqui
    next(err);
  }
};

exports.getMySubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const subscription = await subscriptionService.getSubscriptionByUser(userId);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found.' });
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
      return res.status(404).json({ message: 'Subscription not found.' });
    }
    res.json({ subscription });
  } catch (err) {
    next(err);
  }
};
