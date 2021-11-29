const recipes = require('../../models/document')('recipes');
const { rcpSchema } = require('../../commons/joiSchemas');

module.exports = async (recipe, userId) => {
  const valid = rcpSchema.validate(recipe);

  if (valid.error) {
    return { err: { code: 'invalidEntries' } };
  }

  try {
    const inserted = await recipes.insert({ ...recipe, userId });
    return inserted.ops[0];
  } catch (e) {
    console.error(e);
  }
};