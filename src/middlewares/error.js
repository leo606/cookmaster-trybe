const statusCode = require('../commons/statusCodes.json');

function getStatus(code) {
  switch (code) {
    case 'invalid_entries':
      return statusCode.badRequest;
    case 'email_already_exists':
      return statusCode.conflict;
    default:
  }
}

module.exports = (err, _req, res, _next) => {
  const status = getStatus(err.err.code);
  return res.status(status).json({ message: err.err.message });
};