const { ObjectID } = require('mongodb');

const recipes = require('../../models/document')('recipes');

module.exports = async (rcpId, newRcp, user) => {
  try {
    const rcp = await recipes.find(new ObjectID(rcpId));
    const { role, _id: userId } = user;

    if (role === 'admin' || userId === rcp.userId) {
      const updated = await recipes.update(rcp, newRcp);
      return updated.value;
    }
    return { err: { code: 'invalidEntries' } };
  } catch (e) {
    console.error(e);
  }
};
