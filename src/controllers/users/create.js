const statusCode = require('../../commons/statusCodes.json');
const service = require('../../services/users');

const errorsObjs = {
  invalidEntries: { err: {
    code: 'invalid_entries',
    message: 'Invalid entries. Try again.',
  } },
  emailAlreadyExists: { err: {
    code: 'email_already_exists',
    message: 'Email already registered',
  } },
};

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
  
    const created = await service.create({ name, email, password });
    if (created.err) {
      return next(errorsObjs[created.err.code]);
    }
    
    res.status(statusCode.created).json({ user: created });
  } catch (e) {
    console.error(e);
  }
};