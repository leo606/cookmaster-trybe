const find = require('./find');
const insert = require('./insert');

module.exports = (collection) => ({
  find: (filter) => find(collection, filter),
  insert: (entity) => insert(collection, entity),
});