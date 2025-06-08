// src/config/geoLocation.js
const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');

// Lê a API key e o modo async de variáveis de ambiente
const API_KEY   = process.env.IPGEO_API_KEY;
const ASYNC     = process.env.IPGEO_ASYNC === 'true'; // false se não definido

if (!API_KEY) {
  throw new Error('Missing IPGEO_API_KEY in environment');
}

// Instancia o cliente da API
const ipgeolocationApi = new IPGeolocationAPI(API_KEY, ASYNC);

module.exports = ipgeolocationApi;
