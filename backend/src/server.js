// src/server.js
require('dotenv').config();           // carrega .env
require('./config/database');        // inicializa conexão com MongoDB

const express = require('express');
const app = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
const authRoutes       = require('./routes/auth.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const cryptoRoutes     = require('./routes/crypto.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const paymentRoutes    = require('./routes/payment.routes');

app.use('/api/auth',        authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/crypto',     cryptoRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/payments',   paymentRoutes);

// health-check
app.get('/', (req, res) => {
  res.send('🟢 API rodando');
});

// error handler genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno de servidor'
  });
});

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  Server up na porta ${PORT}`);
});
