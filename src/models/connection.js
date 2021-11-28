const { MongoClient } = require('mongodb');

const DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Cookmaster`;
const DB_NAME = 'Cookmaster';
const DB_OPTS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let conn = null;

module.exports = async () => {
  if (conn) return conn;
  conn = await (await MongoClient.connect(DB_URL, DB_OPTS)).db(DB_NAME);
  return conn;
};