const conn = require('../connection');

module.exports = async (collection, filter, update) => {
  try {
    const updated = await (await conn())
      .collection(collection)
      .findOneAndUpdate(
        { ...filter },
        { $set: { ...update } },
        { returnOriginal: false },
      );
    return updated;
  } catch (e) {
    console.error(e);
  }
};