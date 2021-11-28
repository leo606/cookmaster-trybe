const statusCode = require('../../commons/statusCodes.json');
const service = require('../../services/users');

const ERR_OBJ = { err: {
  code: 'invalid_entries',
  message: 'Invalid entries. Try again',
} };

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
  
    const created = await service.create({ name, email, password });
    if (created.err) {
      return next(ERR_OBJ);
    }
    
    res.status(statusCode.created).json(created);
  } catch (e) {
    console.error(e);
  }
};