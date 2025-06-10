// crypto.service.js
const api = require('../config/cryptoApi');
const useCMC = !!process.env.CMC_API_KEY;
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

    let data;
    if (useCMC) {
      const response = await api.get('/cryptocurrency/listings/latest', {
        params: { start: 1, limit, convert }
      });
      data = response.data.data.map(c => ({
        symbol: c.symbol,
        price: c.quote[convert].price,
        change24h: c.quote[convert].percent_change_24h
      }));
    } else {
      const vs_currency = convert.toLowerCase();
      const response = await api.get('/coins/markets', {
        params: {
          vs_currency,
          order: 'market_cap_desc',
          per_page: limit,
          page: 1
        }
      });
      data = response.data.map(c => ({
        symbol: c.symbol.toUpperCase(),
        price: c.current_price,
        change24h: c.price_change_percentage_24h
      }));
    }

    cache.set(key, { ts: now, data });
    return data;
  }
}

module.exports = CryptoService;
