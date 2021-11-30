const chai = require("chai");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

const server = require("../api/app");

chai.use(chaiHttp);

describe("testa funcionamento de recipes", () => {
  let connMock;
  let DB_SERVER;
  before(async () => {
    DB_SERVER = await MongoMemoryServer.create();
    const DB_URI = DB_SERVER.getUri();
    connMock = await MongoClient.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, "connect").resolves(connMock);
  });
  after(async () => {
    await DB_SERVER.stop();
    await MongoClient.connect.restore();
  });

  describe("quando não é enviado token", () => {
    let response = {};
    before(async () => {
      response = await chai
        .request(server)
        .post("/recipes")
        .send({
          name: "recipe one",
          ingredients: "recipe ingredients",
          preparation: "recipe preparation",
        })
        .set("authorization", "");
    });

    it("retorna status 401", () => {
      expect(response).to.have.status(401);
    });

    it("retorna body com msg de erro", () => {
      expect(response.body).to.have.property("message");
    });
  });

  describe("quando é enviado token, mas dados invalidos", () => {
    let response = {};
    before(async () => {
      const db = await connMock.db("Cookmaster");
      await db.collection("users").insertOne({
        name: "user mock",
        email: "mock@gmail.com",
        password: "12345678",
        role: "user",
      });

      const {
        body: { token },
      } = await chai.request(server).post("/login").send({
        email: "mock@gmail.com",
        password: "12345678",
      });

      response = await chai
        .request(server)
        .post("/recipes")
        .send({
          // name: "recipe one",
          // ingredients: "recipe ingredients",
          // preparation: "recipe preparation",
        })
        .set("authorization", token);
    });

    it("retorna status 401", () => {
      expect(response).to.have.status(400);
    });

    it("retorna body com msg de erro", () => {
      expect(response.body).to.have.property(
        "message",
        "Invalid entries. Try again."
      );
    });
  });

  describe("quando é enviado token e dados validos", () => {
    let response = {};
    before(async () => {
      const db = await connMock.db("Cookmaster");
      await db.collection("users").insertOne({
        name: "user mock",
        email: "mock@gmail.com",
        password: "12345678",
        role: "user",
      });

      const {
        body: { token },
      } = await chai.request(server).post("/login").send({
        email: "mock@gmail.com",
        password: "12345678",
      });

      response = await chai
        .request(server)
        .post("/recipes")
        .send({
          name: "recipe one",
          ingredients: "recipe ingredients",
          preparation: "recipe preparation",
        })
        .set("authorization", token);
    });

    it("retorna status 201", () => {
      expect(response).to.have.status(201);
    });

    it("retorna body com msg de erro", () => {
      expect(response.body).to.have.property("recipe").that.is.an("object");
    });
  });
});
