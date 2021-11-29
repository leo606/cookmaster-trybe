const statusCode = require('../commons/statusCodes.json');

function getStatus(code) {
  switch (code) {
    case 'invalid_entries':
      return statusCode.badRequest;
    case 'email_already_exists':
      return statusCode.conflict;
    case 'unauthorized':
      return statusCode.unauthorized;
    case 'not_found':
        return statusCode.notFound;
    default:
  }
}

module.exports = (err, _req, res, _next) => {
  const status = getStatus(err.err.code);
  return res.status(status).json({ message: err.err.message });
};