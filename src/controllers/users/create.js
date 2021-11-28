const statusCode = require('../../commons/statusCodes.json');

module.exports = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next({ err: {
      code: 'invalid_entries',
      message: 'Invalid entries. Try again',
    } });
  }
  
  res.status(statusCode.notImplemented).end();
};