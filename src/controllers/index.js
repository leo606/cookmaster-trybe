const express = require('express');

const root = express.Router({ mergeParams: true });

root.use('/users', require('./users/router'));
root.use('/recipes', require('./recipes/router'));

module.exports = root;