const jwt = require('jsonwebtoken');

const secret = 'thisIsASuperSecretKey';

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ err: { message: 'missing auth token', code: 'unauthorized' } });
  }

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.data;
    return next();
  } catch (e) {
    return next({ err: { message: e.message, code: 'unauthorized' } });
  }
};
