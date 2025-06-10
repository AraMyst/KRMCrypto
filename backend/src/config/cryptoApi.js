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
  console.warn('⚠️  CMC_API_KEY not set. Using CoinGecko API.');
  const headers = { Accept: 'application/json' };
  if (process.env.COINGECKO_API_KEY) {
    headers['x-cg-demo-api-key'] = process.env.COINGECKO_API_KEY;
  } else {
    console.warn('⚠️  COINGECKO_API_KEY not set. Using public CoinGecko API which has stricter rate limits.');
  }
  api = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    headers
  });
}

module.exports = api;
