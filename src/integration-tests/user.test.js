const chai = require("chai");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

const server = require("../api/app");

chai.use(chaiHttp);

describe("testa funcionamento de users", () => {
  let response = {};
  before(async () => {
    const DB_SERVER = await MongoMemoryServer.create();
    const DB_URI = DB_SERVER.getUri();
    const connMock = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, "connect").resolves(connMock);

    response = await chai.request(server).post("/users").send({
      name: "fulano",
      email: "fulano@detal.com",
      password: "passsss123",
    });
  });
  describe("quando é criado com sucesso", () => {
    it("retorna status 201", () => {
      expect(response).to.have.status(201);
    });

    it("retorna body com dados cadastrados", () => {
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property("email", "fulano@detal.com");
      expect(response.body.user).to.have.property("role", "user");
      expect(response.body.user).to.have.property("_id");
    });
  });

  describe("quando é informado dados invalidos", () => {
    before(async () => {
      response = await chai.request(server).post("/users").send({
        email: "fulano@detal.com",
        password: "passsss123",
      });
    });

    it("retorna status 201", () => {
      expect(response).to.have.status(400);
    });

    it("retorna body com msg de erro", () => {
      expect(response.body).to.have.property(
        "message",
        "Invalid entries. Try again."
      );
    });
  });
});
