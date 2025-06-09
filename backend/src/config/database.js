// config/database.js
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  // In dev/test environments the DB may be optional
  console.warn('⚠️  MONGODB_URI not set, skipping MongoDB connection');
  module.exports = mongoose;
  return;
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
