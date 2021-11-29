const find = require('./find');
const insert = require('./insert');
const list = require('./list');
const update = require('./update');

module.exports = (collection) => ({
  find: (filter) => find(collection, filter),
  insert: (entity) => insert(collection, entity),
  list: (filter) => list(collection, filter),
  update: (filter, newSet) => update(collection, filter, newSet),
});