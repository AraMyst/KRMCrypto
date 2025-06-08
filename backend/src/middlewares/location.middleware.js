// src/middlewares/location.middleware.js
const geoService = require('../services/geo.service');

/**
 * Middleware Express que anexa em req.location os dados de país detectado pelo IP.
 * Usa X-Forwarded-For ou connection.remoteAddress.
 */
async function locationMiddleware(req, res, next) {
  // Pega o IP do usuário (ajuste se tiver proxy ou load balancer)
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded
    ? forwarded.split(',')[0].trim()
    : req.connection.remoteAddress;

  try {
    const geo = await geoService.getGeolocation(ip);
    // Ajuste os campos de acordo com o que você precisa na ordenação das categorias
    req.location = {
      ip:             geo.ip || ip,
      countryCode2:   geo.country_code2,
      countryName:    geo.country_name,
      continent:      geo.continent_name,
      timezone:       geo.time_zone?.name,
      currency:       geo.currency?.code
    };
  } catch (err) {
    console.error('GeoMiddleware error:', err);
    // Em caso de falha, ainda seguimos adiante com req.location undefined
  }

  next();
}

module.exports = locationMiddleware;
