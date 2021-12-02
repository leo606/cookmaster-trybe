const chai = require("chai");
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

const server = require("../api/app");
const mockConn = require("./mocks/mockConn");

chai.use(chaiHttp);

describe("testa funcionamento de users", () => {
  let response = {};
  let DB_SERVER;
  before(async () => {
    const connMock = await mockConn();

    sinon.stub(MongoClient, "connect").resolves(connMock);

    response = await chai.request(server).post("/users").send({
      name: "ciclano",
      email: "fulano@email.com",
      password: "passsss1234",
    });
  });
  after(() => {
    MongoClient.connect.restore();
  });
  describe("quando é criado com sucesso", () => {
    it("retorna status 201", () => {
      expect(response).to.have.status(201);
    });

    it("retorna body com dados cadastrados", () => {
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property("email", "fulano@email.com");
      expect(response.body.user).to.have.property("role", "user");
      expect(response.body.user).to.have.property("_id");
    });
  });

  describe("quando é informado dados invalidos", () => {
    before(async () => {
      response = await chai.request(server).post("/users").send({
        email: "fulano@email.com",
        password: "passsss1234",
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
