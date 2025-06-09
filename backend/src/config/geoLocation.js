// src/config/geoLocation.js
const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');

// Lê a API key e o modo async de variáveis de ambiente
const API_KEY = process.env.IPGEO_API_KEY;
const ASYNC = process.env.IPGEO_ASYNC === 'true';

let ipgeolocationApi = null;
if (API_KEY) {
  ipgeolocationApi = new IPGeolocationAPI(API_KEY, ASYNC);
} else {
  console.warn('⚠️  IPGEO_API_KEY not set. Geolocation features disabled.');
}

module.exports = ipgeolocationApi;
