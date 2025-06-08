// routes/subscription.routes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateSubscription, validateObjectId, handleValidation } = require('../utils/validators');

// Usuário autenticado
router.post(
  '/',
  protect,
  validateSubscription,
  handleValidation,
  subscriptionController.createSubscription
);

router.get(
  '/me',
  protect,
  subscriptionController.getMySubscription
);

router.put(
  '/me',
  protect,
  validateSubscription,
  handleValidation,
  subscriptionController.updateSubscription
);

router.delete(
  '/me',
  protect,
  subscriptionController.cancelSubscription
);

// Rotas de admin
router.get(
  '/',
  protect,
  authorize('admin'),
  subscriptionController.getAllSubscriptions
);

router.get(
  '/:id',
  protect,
  authorize('admin'),
  validateObjectId,
  handleValidation,
  subscriptionController.getSubscriptionById
);

module.exports = router;
