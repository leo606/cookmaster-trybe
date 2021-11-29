const { ObjectID } = require('mongodb');
const recipes = require('../../models/document')('recipes');

module.exports = async (rcpId) => {
  try {
    const deleted = await recipes.remove({ _id: new ObjectID(rcpId) });
    return deleted;
  } catch (e) {
    console.error(e);
  }
};  