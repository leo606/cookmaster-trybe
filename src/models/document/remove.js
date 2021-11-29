const conn = require('../connection');

module.exports = async (collection, filter) => {
  try {
    const connection = await conn();
    const deleted = await connection
      .collection(collection).deleteOne(filter);
    return deleted;
  } catch (e) {
    console.error(e);
  }
};
