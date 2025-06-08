// middlewares/error.middleware.js

module.exports = (err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  res.status(status).json({
    message: err.message || 'Erro interno no servidor.',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
