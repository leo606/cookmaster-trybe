const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

async function mockConn() {
  DB_SERVER = await MongoMemoryServer.create();
  const DB_URI = DB_SERVER.getUri();
  const connMock = await MongoClient.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connMock;
}

module.exports = mockConn;
