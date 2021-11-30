const statusCode = require('../commons/statusCodes.json');

module.exports = (err, _req, res, _next) => {
  const status = statusCode[err.err.code];
  return res.status(status).json({ message: err.err.message });
};