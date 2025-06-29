// crypto.routes.js
const express = require('express');
const CryptoController = require('../controllers/crypto.controller');

const router = express.Router();

// rota para ticker
router.get('/ticker', CryptoController.ticker);

module.exports = router;
