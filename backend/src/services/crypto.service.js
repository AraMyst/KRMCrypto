// crypto.service.js
const api = require('../config/cryptoApi');
const useCMC = !!process.env.CMC_API_KEY;

class CryptoService {
  /**
   * Busca as N principais criptomoedas por market cap.
   * @param {number} limit Quantidade de moedas a retornar.
   * @param {string} convert Moeda fiat para conversão (ex: 'USD,BRL').
   */
  static async getTopCryptos(limit = 10, convert = 'USD') {
    if (useCMC) {
      const response = await api.get('/cryptocurrency/listings/latest', {
        params: { start: 1, limit, convert }
      });
      return response.data.data.map(c => ({
        symbol: c.symbol,
        price: c.quote[convert].price,
        change24h: c.quote[convert].percent_change_24h
      }));
    }

    const vs_currency = convert.toLowerCase();
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency,
        order: 'market_cap_desc',
        per_page: limit,
        page: 1
      }
    });
    return response.data.map(c => ({
      symbol: c.symbol.toUpperCase(),
      price: c.current_price,
      change24h: c.price_change_percentage_24h
    }));
  }
}

module.exports = CryptoService;
