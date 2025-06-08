// app.js
env.config(); // Carrega variáveis de ambiente de .env
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/user.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const cryptoPriceRoutes = require('./routes/crypto.routes');

const { errorHandler } = require('./middlewares/error.middleware');

// Conecta ao MongoDB\connectDB();

const app = express();

// Middlewares gerais
app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));  // log de requisições
}

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/crypto', cryptoPriceRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});