const express = require('express');

const root = express.Router({ mergeParams: true });

root.use('/users', require('./users/router'));
root.use('/login', require('./login/router'));
root.use('/recipes', require('./recipes/router'));

root.use('/images', express.static(`${__dirname}/../uploads`));

module.exports = root;