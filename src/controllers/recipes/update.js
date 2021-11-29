const statusCode = require('../../commons/statusCodes.json');
const service = require('../../services/recipes');
const errorObjs = require('../../commons/errorObjs.json');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const { name, ingredients, preparation } = req.body;

  try {
    const updated = await service.update(
      id,
      { name, ingredients, preparation },
      user,
    );
    if (updated.err) {
      return next(errorObjs[updated.err.code]);
    }

    res.status(statusCode.ok).json(updated);
  } catch (e) {
    console.error(e);
  }
};
