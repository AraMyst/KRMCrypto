// src/services/geo.service.js
const ipgeolocationApi = require('../config/geoLocation');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

/**
 * Retorna a geolocalização completa para um dado IP (ou para o IP da requisição, se não passar nada).
 * @param {string} [ip] - IP no formato string (por ex. '8.8.8.8'). Se omitido, usa o IP que está chamando a API.
 * @returns {Promise<object>} - Objeto com country_code2, country_name, continente, timezone, etc.
 */
function getGeolocation(ip) {
  // Como a biblioteca usa callbacks, DEVEMOS envolvê-la em uma Promise.
  return new Promise((resolve, reject) => {
    const params = new GeolocationParams();
    if (ip) {
      params.setIPAddress(ip);
    }

    // A chamada à API precisa de um callback de sucesso.
    // Esta é a forma correta de usar esta biblioteca específica.
    ipgeolocationApi.getGeolocation((json) => {
      // É uma boa prática verificar se a resposta da API é na verdade um erro
      if (json.message) {
        // A API retornou uma mensagem de erro, então rejeitamos a Promise
        return reject(new Error(json.message));
      }
      // Se tudo correu bem, resolvemos a Promise com os dados
      resolve(json);
    }, params);

    // Nota: Muitas bibliotecas de callback também aceitam um segundo argumento
    // para o callback de erro, mas esta parece enviar o erro no primeiro callback.
    // Se ela tivesse um callback de erro, a chamada seria:
    // ipgeolocationApi.getGeolocation(resolve, reject, params);
  });
}

module.exports = {
  getGeolocation,
};