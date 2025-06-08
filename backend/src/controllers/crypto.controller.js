// crypto.controller.js
const CryptoService = require('../services/crypto.service');

class CryptoController {
  /**
   * GET /api/crypto/ticker?limit=10&convert=USD
   * Retorna JSON com array de { symbol, price, change24h }.
   */
  static async ticker(req, res, next) {
    try {
      const limit = parseInt(req.query.limit, 10) || 10;
      const convert = req.query.convert || 'USD';
      const data = await CryptoService.getTopCryptos(limit, convert);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CryptoController;
