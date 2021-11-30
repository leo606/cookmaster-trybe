const chai = require("chai");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

const server = require("../api/app");

chai.use(chaiHttp);

describe("testa funcionamento de users", () => {
  let response = {};
  let DB_SERVER;

  before(async () => {
    DB_SERVER = await MongoMemoryServer.create();
    const DB_URI = DB_SERVER.getUri();
    const connMock = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, "connect").resolves(connMock);

    await chai.request(server).post("/users").send({
      name: "fulano",
      email: "fulano@detal.com",
      password: "passsss123",
    });

    response = await chai.request(server).post("/login").send({
      email: "fulano@detal.com",
      password: "passsss123",
    });
  });

  after(async () => {
    await DB_SERVER.stop();
    await MongoClient.connect.restore();
  });
  describe("quando é criado com sucesso", () => {
    it("retorna status 200", () => {
      expect(response).to.have.status(200);
    });

    it("retorna body com token", () => {
      expect(response.body).to.have.property("token");
      const tokenDecoded = jwt.decode(response.body.token);
      expect(tokenDecoded).to.have.property("data");
    });
  });

  describe("quando é informado dados invalidos", () => {
    before(async () => {
      response = await chai.request(server).post("/login").send({
        email: "ciclano@detal.com",
        password: "passsss123",
      });
    });

    it("retorna status 401", () => {
      expect(response).to.have.status(401);
    });

    it("retorna body com msg de erro", () => {
      expect(response.body).to.have.property(
        "message",
        "Incorrect username or password"
      );
    });
  });
});
