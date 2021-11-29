const recipes = require('../../models/document')('recipes');

module.exports = async () => {
  try {
    const list = await recipes.list();
    return list;
  } catch (e) {
    console.error(e);
  }
};