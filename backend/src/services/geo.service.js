// src/services/geo.service.js
const ipgeolocationApi    = require('../config/geoLocation');
const GeolocationParams   = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

/**
 * Retorna a geolocalização completa para um dado IP (ou para o IP da requisição, se não passar nada).
 * @param {string} [ip] - IP no formato string (por ex. '8.8.8.8'). Se omitido, usa o IP que está chamando a API.
 * @returns {Promise<object>} - Objeto com country_code2, country_name, continente, timezone, etc.
 */
function getGeolocation(ip) {
  return new Promise((resolve, reject) => {
    const params = new GeolocationParams();
    if (ip) {
      params.setIPAddress(ip);
    }
    try {
      ipgeolocationApi.getGeolocation(
        (json) => resolve(json),
        params
      );
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  getGeolocation
};
