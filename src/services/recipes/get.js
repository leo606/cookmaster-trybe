const { ObjectID } = require('mongodb');

const recipes = require('../../models/document')('recipes');

module.exports = async (id) => {
  if (!ObjectID.isValid(id)) {
    return { err: { code: 'rcpNotFound' } };
  }

  try {
    const rcp = await recipes.find(new ObjectID(id));
    if (!rcp) {
      return { err: { code: 'rcpNotFound' } };
    }

    return rcp;
  } catch (e) {
    console.error(e);
  }
};