const find = require('./find');
const insert = require('./insert');
const list = require('./list');

module.exports = (collection) => ({
  find: (filter) => find(collection, filter),
  insert: (entity) => insert(collection, entity),
  list: (filter) => list(collection, filter),
});