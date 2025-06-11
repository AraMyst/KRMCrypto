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
  .then(() => console.log('✅  MongoDB connected'))
  .catch(err => {
    console.error('❌  Error connecting to MongoDB:', err);
    process.exit(1);
  });
