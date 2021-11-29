const statusCode = require('../../commons/statusCodes.json');
const service = require('../../services/recipes');
const errorObjs = require('../../commons/errorObjs.json');

module.exports = async (req, res, next) => {
  const { id } = req.params;

  try {
    const rcp = await service.get(id);
    if (rcp.err) {
      return next(errorObjs[rcp.err.code]);
    }

    res.status(statusCode.ok).json(rcp);
  } catch (e) {
    console.log(e);
  }
};