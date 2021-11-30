const express = require('express');

const app = express();
app.use(express.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(express.static(`${__dirname}/../../`));

app.use(require('../controllers'));

app.use(require('../middlewares/error'));

module.exports = app;
