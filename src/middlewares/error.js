const statusCode = require('../commons/statusCodes.json');

function getStatus(code) {
  switch (code) {
    case 'invalid_entries':
      return statusCode.badRequest;
    default:
  }
}

module.exports = (err, _req, res, _next) => {
  const status = getStatus(err.err.code);
  return res.status(status).json({ message: err.err.message });
};