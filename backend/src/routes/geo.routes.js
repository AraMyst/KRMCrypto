const express = require('express');
const router = express.Router();
const locationMiddleware = require('../middlewares/location.middleware');

// Returns geolocation info for the requesting IP
router.get('/', locationMiddleware, (req, res) => {
  if (!req.location) {
    return res.status(500).json({ message: 'Geolocation unavailable' });
  }
  res.json(req.location);
});

module.exports = router;
