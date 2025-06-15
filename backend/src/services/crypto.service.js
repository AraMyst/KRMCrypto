// crypto.service.js
const api = require('../config/cryptoApi');
const cache = new Map();

class CryptoService {
  /**
   * Busca as N principais criptomoedas por market cap.
   * @param {number} limit Quantidade de moedas a retornar.
   * @param {string} convert Moeda fiat para conversão (ex: 'USD,BRL').
   */
  static async getTopCryptos(limit = 10, convert = 'USD') {
    const key = `${limit}_${convert}`;
    const cached = cache.get(key);
    const now = Date.now();
    if (cached && now - cached.ts < 60_000) {
      return cached.data;
    }

    const vs_currency = convert.toLowerCase();
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency,
        order: 'market_cap_desc',
        per_page: limit,
        page: 1
      },
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-ZT6288PKHr8HSV1SbjwDJB3u'}
    });
    const data = response.data.map(c => ({
      symbol: c.symbol.toUpperCase(),
      price: c.current_price,
      change24h: c.price_change_percentage_24h
    }));

    cache.set(key, { ts: now, data });
    return data;
  }
}

module.exports = CryptoService;
