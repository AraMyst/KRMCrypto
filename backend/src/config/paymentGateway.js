// config/paymentGateway.js
const { Client, resources } = require('coinbase-commerce-node');
require('dotenv').config();

const apiKey = process.env.COINBASE_API_KEY;
if (apiKey) {
  Client.init(apiKey);
} else {
  console.warn('⚠️  COINBASE_API_KEY not set. Payment features disabled.');
}

module.exports = {
  resources,               // para criar e recuperar charges
  baseURL: 'https://api.commerce.coinbase.com'
};
