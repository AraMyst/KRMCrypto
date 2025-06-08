// crypto.service.js
const api = require('../config/cryptoApi');

class CryptoService {
  /**
   * Busca as N principais criptomoedas por market cap.
   * @param {number} limit Quantidade de moedas a retornar.
   * @param {string} convert Moeda fiat para conversão (ex: 'USD,BRL').
   */
  static async getTopCryptos(limit = 10, convert = 'USD') {
    const response = await api.get('/cryptocurrency/listings/latest', {
      params: { start: 1, limit, convert }
    });
    // retorna [{ symbol, price, percent_change_24h }, ...]
    return response.data.data.map(c => ({
      symbol: c.symbol,
      price: c.quote[convert].price,
      change24h: c.quote[convert].percent_change_24h
    }));
  }
}

module.exports = CryptoService;
