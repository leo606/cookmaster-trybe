const statusCode = require('../../commons/statusCodes.json');
const service = require('../../services/recipes');

const errorsObjs = require('../../commons/errorObjs.json');

module.exports = async (req, res, next) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { user: { _id: userId } } = req;
    
    const created = await service.create({ name, ingredients, preparation });
    if (created.err) {
      return next(errorsObjs[created.err.code]);
    }

    return res.status(statusCode.created).json({ recipe: { ...created, userId } });
  } catch (e) {
    console.error(e);
  }
};