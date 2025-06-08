// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

// cadastro e login
router.post('/register', authController.register);
router.post('/login',    authController.login);

// rotas protegidas
router.get('/me',        protect, authController.getMe);
router.put('/me',        protect, authController.updateMe);
router.delete('/me',     protect, authController.deleteMe);

module.exports = router;
