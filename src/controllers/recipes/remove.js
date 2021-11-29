const statusCode = require('../../commons/statusCodes.json');
const service = require('../../services/recipes');

module.exports = async (req, res, _next) => {
  const { id } = req.params;
  try {
    await service.remove(id);
    return res.status(statusCode.noContent).end();
  } catch (e) {
    console.error(e);
  }
};