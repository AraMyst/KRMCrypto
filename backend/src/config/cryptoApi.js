// cryptoApi.js
const axios = require('axios');

const headers = { Accept: 'application/json' };
if (process.env.COINGECKO_API_KEY) {
  headers['x-cg-demo-api-key'] = process.env.COINGECKO_API_KEY;
} else {
  console.warn('⚠️  COINGECKO_API_KEY not set. Using public CoinGecko API which has stricter rate limits.');
}

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers
});

module.exports = api;
