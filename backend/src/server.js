// src/server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Verifica variáveis de ambiente críticas
const requiredEnv = [
  'JWT_SECRET',
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASSWORD',
  'EMAIL_FROM'
];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`❌  Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}
require('./config/database'); // inicializa conexão com MongoDB

const express = require('express');
const cors = require('cors'); 
const app = express();

const allowedOrigins = [
  'https://krm-crypto-en.vercel.app', // Domínio de produção do seu frontend
  'http://localhost:3000'             // Domínio de desenvolvimento local
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// rotas
const authRoutes = require('./routes/auth.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const cryptoRoutes = require('./routes/crypto.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const paymentRoutes = require('./routes/payment.routes');
const categoryRoutes = require('./routes/category.routes');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const geoRoutes = require('./routes/geo.routes');

app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/crypto', cryptoRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/geo', geoRoutes);

// health-check
app.get('/', (req, res) => {
  res.send('🟢 API running');
});

// error handler genérico
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  Server up on port ${PORT}`);
});