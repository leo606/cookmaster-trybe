const statusCode = require('../../commons/statusCodes.json');
const service = require('../../services/recipes');

module.exports = async (_req, res, _next) => {
  try {
    const list = await service.list();
    res.status(statusCode.ok).json(list);
  } catch (e) {
    console.error(e);
  }
};