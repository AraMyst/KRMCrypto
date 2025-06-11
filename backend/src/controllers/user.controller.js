// controllers/user.controller.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Usuário logado vê seu próprio perfil
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// Usuário logado atualiza seu perfil
exports.updateMe = async (req, res, next) => {
  try {
    const allowed = ['firstName', 'lastName', 'email', 'password'];
    const updates = {};
    allowed.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    // Se vier senha, o model deve ter pre-save hash
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
      context: 'query'
    }).select('-password');

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// Usuário logado apaga sua conta
exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// ====== Rotas de Admin ======

// Lista todos os usuários
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (err) {
    next(err);
  }
};

// Busca usuário por ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// Admin atualiza usuário por ID
exports.updateUser = async (req, res, next) => {
  try {
    const allowed = ['firstName', 'lastName', 'email', 'role'];
    const updates = {};
    allowed.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
      context: 'query'
    }).select('-password');

    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

// Admin deleta usuário por ID
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
