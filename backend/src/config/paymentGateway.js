// config/paymentGateway.js
const { Client, resources } = require('coinbase-commerce-node');
require('dotenv').config();

Client.init(process.env.COINBASE_API_KEY);

module.exports = {
  resources,               // para criar e recuperar charges
  baseURL: 'https://api.commerce.coinbase.com'
};
