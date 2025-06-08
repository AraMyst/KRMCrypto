// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { validateObjectId, validateUserUpdate, handleValidation } = require('../utils/validators');

// Apenas admins gerenciam usuários
router.get(
  '/',
  protect,
  authorize('admin'),
  userController.getAllUsers
);

router.get(
  '/:id',
  protect,
  authorize('admin'),
  validateObjectId,
  handleValidation,
  userController.getUserById
);

router.put(
  '/:id',
  protect,
  authorize('admin'),
  validateUserUpdate,
  handleValidation,
  userController.updateUser
);

router.delete(
  '/:id',
  protect,
  authorize('admin'),
  validateObjectId,
  handleValidation,
  userController.deleteUser
);

module.exports = router;
