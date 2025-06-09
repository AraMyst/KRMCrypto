// cryptoApi.js
const axios = require('axios');

let api;
if (process.env.CMC_API_KEY) {
  api = axios.create({
    baseURL: 'https://pro-api.coinmarketcap.com/v1',
    headers: {
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
      'Accept': 'application/json'
    }
  });
} else {
  console.warn('⚠️  CMC_API_KEY not set. Using CoinGecko public API.');
  api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    headers: { 'Accept': 'application/json' }
  });
}

module.exports = api;
