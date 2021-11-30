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
    const db = await connMock.db("Cookmaster");
    await db.collection("recipes").drop();
    await db.collection("users").drop();
    await DB_SERVER.stop();
    await MongoClient.connect.restore();
  });

  describe("POST recipes", () => {
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

  describe("GET recipes", () => {
    describe("quando não é enviado token", () => {
      let response = {};
      before(async () => {
        // const db = await connMock.db("Cookmaster");
        // await db.collection("recipes").drop();
        response = await chai.request(server).get("/recipes");
      });

      it("retorna status 200", () => {
        expect(response).to.have.status(200);
      });

      it("retorna array de receitas", () => {
        expect(response.body).to.be.an("array");
      });
    });
  });

  describe("GET recipes/id", () => {
    describe("quando não é enviado token", () => {
      const recipe = {
        name: "kdjfng",
        ingredients: "kdfjgdfg",
        preparation: "lkdjfg",
      };
      let response = {};
      before(async () => {
        const db = await connMock.db("Cookmaster");
        const { insertedId } = await db.collection("recipes").insertOne(recipe);
        response = await chai.request(server).get(`/recipes/${insertedId}`);
      });

      it("retorna status 200", () => {
        expect(response).to.have.status(200);
      });

      it("retorna objeto de receita", () => {
        expect(response.body).to.be.an("object");
      });
    });
  });

  describe("DELETE recipes/id", () => {
    describe("quando não é enviado token", () => {
      const recipe = {
        name: "kdjfng",
        ingredients: "kdfjgdfg",
        preparation: "lkdjfg",
      };
      let response = {};
      before(async () => {
        const db = await connMock.db("Cookmaster");
        const { insertedId } = await db.collection("recipes").insertOne(recipe);
        response = await chai.request(server).delete(`/recipes/${insertedId}`);
      });

      it("retorna status 401", () => {
        expect(response).to.have.status(401);
      });

      it("retorna objeto de receita", () => {
        expect(response.body)
          .to.be.an("object")
          .that.have.property("message", "missing auth token");
      });
    });

    describe("quando é enviado token", () => {
      const recipe = {
        name: "kdjfng",
        ingredients: "kdfjgdfg",
        preparation: "lkdjfg",
      };
      const user = {
        name: "jhsdf kjhsdgf",
        email: "email@email.com",
        password: "of87dsyf89n7dyf",
      };
      let response = {};
      before(async () => {
        const db = await connMock.db("Cookmaster");
        const { insertedId } = await db.collection("recipes").insertOne(recipe);
        await db.collection("users").insertOne(user);
        const {
          body: { token },
        } = await chai.request(server).post("/login").send({
          email: "email@email.com",
          password: "of87dsyf89n7dyf",
        });
        response = await chai
          .request(server)
          .delete(`/recipes/${insertedId}`)
          .set("authorization", token);
      });

      it("retorna status 204 no content", () => {
        expect(response).to.have.status(204);
      });

      it("retorna objeto vazio", () => {
        expect(response.body).to.be.deep.equal({});
      });
    });
  });

  describe("PUT recipes/id", () => {
    describe("quando é enviado token, mas user invalido", () => {
      const recipe = {
        name: "kdjfng",
        ingredients: "kdfjgdfg",
        preparation: "lkdjfg",
      };
      const user = {
        name: "jhsdf kjhsdgf",
        email: "email@email.com",
        password: "of87dsyf89n7dyf",
        role: "user",
      };
      let response = {};
      before(async () => {
        const db = await connMock.db("Cookmaster");
        await db.collection("users").drop();
        await db.collection("recipes").drop();
        await db.collection("users").insertOne(user);

        const { insertedId } = await db.collection("recipes").insertOne(recipe);

        const {
          body: { token },
        } = await chai.request(server).post("/login").send({
          email: "email@email.com",
          password: "of87dsyf89n7dyf",
        });

        response = await chai
          .request(server)
          .put(`/recipes/${insertedId}`)
          .send({
            name: "change",
            ingredients: "change",
            preparation: "change",
          })
          .set("authorization", token);
      });

      it("retorna status 400", () => {
        expect(response).to.have.status(400);
      });

      it("retorna objeto de receita", () => {
        expect(response.body)
          .to.be.an("object")
          .that.have.property("message", "Invalid entries. Try again.");
      });
    });

    describe("quando é enviado token e user valido", () => {
      let response = {};

      before(async () => {
        const db = await connMock.db("Cookmaster");
        await db.collection("users").drop();
        await db.collection("recipes").drop();

        await chai.request(server).post("/users").send({
          name: "name name",
          email: "email@email.com",
          password: "of87dsyf89n7dyf",
        });

        const {
          body: { token },
        } = await chai.request(server).post("/login").send({
          email: "email@email.com",
          password: "of87dsyf89n7dyf",
        });

        const {
          body: {
            recipe: { _id: insertedId },
          },
        } = await chai
          .request(server)
          .post("/recipes")
          .send({
            name: "kdjfng",
            ingredients: "kdfjgdfg",
            preparation: "lkdjfg",
          })
          .set("authorization", token);

        response = await chai
          .request(server)
          .put(`/recipes/${insertedId}`)
          .send({
            name: "change",
            ingredients: "change",
            preparation: "change",
          })
          .set("authorization", token);
      });

      it("retorna status 200 ok", () => {
        expect(response).to.have.status(200);
      });

      it("retorna objeto com receita nova", () => {
        expect(response.body).to.have.property("name", "change");
        expect(response.body).to.have.property("ingredients", "change");
        expect(response.body).to.have.property("preparation", "change");
      });
    });
  });
});
