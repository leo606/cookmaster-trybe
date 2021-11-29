const jwt = require('jsonwebtoken');

const secret = 'thisIsASuperSecretKey';

module.exports = async (req, _res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.data;
    return next();
  } catch (e) {
    return next({ err: { message: e.message, code: 'unauthorized' } });
  }
};
