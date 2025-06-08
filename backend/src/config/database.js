// config/database.js
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  console.error('❌  MONGODB_URI não definida em .env');
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('✅  MongoDB conectado'))
  .catch(err => {
    console.error('❌  Erro ao conectar no MongoDB:', err);
    process.exit(1);
  });
