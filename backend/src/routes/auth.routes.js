// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

// cadastro e login
router.post('/register', authController.register);
router.post('/login',    authController.login);

// rotas protegidas
router.get('/me',        protect, userController.getMe);
router.put('/me',        protect, userController.updateMe);
router.delete('/me',     protect, userController.deleteMe);

module.exports = router;
