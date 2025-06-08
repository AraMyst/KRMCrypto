// cryptoApi.js
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY,
    'Accept': 'application/json'
  }
});

module.exports = api;
