const { ObjectID } = require('mongodb');

const recipes = require('../../models/document')('recipes');
// const { rcpSchema } = require('../../commons/joiSchemas');

module.exports = async (rcpId, newRcp, user) => {
  // const valid = rcpSchema.validate(newRcp);

  // if (valid.error) {
  //   return { err: { code: 'invalidEntries' } };
  // }

  try {
    const rcp = await recipes.find(new ObjectID(rcpId));
    const { role, _id: userId } = user;

    if (role === 'admin' || userId === rcp.userId) {
      const updated = await recipes.update(rcp, newRcp);
      return updated.value;
    }
  } catch (e) {
    console.error(e);
  }
};