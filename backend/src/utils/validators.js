const { body, param, validationResult } = require('express-validator');

// Regex para senhas: mínimo 8 caracteres, uma maiúscula, uma minúscula e um número
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Valida planos de assinatura
const validateSubscription = [
  body('plan')
    .isIn(['daily', 'weekly', 'fortnightly', 'monthly', 'bimonthly', 'quarterly'])
    .withMessage('Plan must be one of: daily, weekly, fortnightly, monthly, bimonthly, quarterly'),
];

// Valida updates de usuário (admin)
const validateUserUpdate = [
  param('id')
    .isMongoId().withMessage('Invalid user ID'),
  body('firstName')
    .optional().notEmpty().withMessage('First name cannot be empty'),
  body('lastName')
    .optional().notEmpty().withMessage('Last name cannot be empty'),
  body('email')
    .optional().isEmail().withMessage('Must be a valid email'),
  body('password')
    .optional().matches(passwordRegex)
    .withMessage('Password must be at least 8 characters, include uppercase, lowercase, and a number'),
];

// Reuso para IDs Mongo válidos
const validateObjectId = [
  param('id')
    .isMongoId().withMessage('Invalid ID'),
];

// Middleware para checar erros do express-validator
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateSubscription,
  validateUserUpdate,
  validateObjectId,
  handleValidation,
};
