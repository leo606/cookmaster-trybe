const conn = require('../connection');

module.exports = async (collection, filter = {}) => {
  try {
    const connection = await conn();
    const find = await connection.collection(collection).find(filter).toArray();
    return find;
  } catch (e) {
    console.error(e);
  }
};