const jwt = require('jsonwebtoken');

const secret = 'thisIsASuperSecretKey';
const users = require('../models/document')('users');

const errorsObjs = {
  invalidEntries: { err: {
    code: 'unauthorized',
    message: 'All fields must be filled',
  } },
  incorrectEntries: { err: {
    code: 'unauthorized',
    message: 'Incorrect username or password',
  } },
};

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(errorsObjs.invalidEntries);
    }

    const user = await users.find({ email, password });
    if (!user) {
      return next(errorsObjs.incorrectEntries);
    }

    req.user = user;
    req.loginToken = jwt.sign({ data: user }, secret, jwtConfig);
    next();
  } catch (e) {
    console.error(e);
  }
};