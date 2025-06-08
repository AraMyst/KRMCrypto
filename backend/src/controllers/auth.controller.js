const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, subscriptionPlan } = req.body;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'A senha deve ter ao menos 8 caracteres, incluindo uma maiúscula, uma minúscula e um número.' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: 'Esse e-mail já está em uso.' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      subscription: {
        plan: subscriptionPlan,
        status: 'pending'
      }
    });

    // gerar token
    const token = jwt.sign(
      { sub: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        subscription: user.subscription
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
      { sub: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

// middleware para proteger rotas
exports.protect = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não enviado.' });
  }
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = (({ firstName, lastName, email, subscriptionPlan }) => 
      ({ firstName, lastName, email, subscription: { plan: subscriptionPlan } }))(req.body);

    if (req.body.password) {
      if (!passwordRegex.test(req.body.password)) {
        return res.status(400).json({ message: 'Senha não atende aos requisitos.' });
      }
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.user.sub, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
};
