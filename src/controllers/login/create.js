const statusCode = require('../../commons/statusCodes.json');

module.exports = (req, res, _next) => {
  res.status(statusCode.ok).json({ token: req.loginToken });
};