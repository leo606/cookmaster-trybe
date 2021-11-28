const conn = require('../connection');

module.exports = async (collection, entity) => {
  try {
    const created = await (await conn()).collection(collection).insertOne(entity);
    return created;
  } catch (e) {
    console.error(e);
  }
};