const statusCode = require('../../commons/statusCodes.json');

module.exports = (_req, res, _next) => {
  res.status(statusCode.notImplemented).end();
};