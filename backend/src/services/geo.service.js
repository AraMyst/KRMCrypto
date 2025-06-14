// src/services/geo.service.js
const ipgeolocationApi = require('../config/geolocation');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

/**
 * Retorna a geolocalização completa para um dado IP (ou para o IP da requisição, se não passar nada).
 * @param {string} [ip] - IP no formato string (por ex. '8.8.8.8'). Se omitido, usa o IP que está chamando a API.
 * @returns {Promise<object>} - Objeto com country_code2, country_name, continente, timezone, etc.
 */
// Transforme a função em async
async function getGeolocation(ip) {
  const params = new GeolocationParams();
  if (ip) {
    params.setIPAddress(ip);
  }

  // Com async/await, o try/catch funciona como esperado para erros de API
  try {
    // Await aguarda a Promise da API resolver
    const json = await ipgeolocationApi.getGeolocation(params);
    return json;
  } catch (err) {
    // Se a Promise da API for rejeitada, o erro é capturado aqui
    console.error('Erro ao buscar geolocalização:', err);
    // Re-lança o erro para que o chamador da função saiba que algo deu errado
    throw err;
  }
}

module.exports = {
  getGeolocation,
};