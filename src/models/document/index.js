const find = require('./find');
const insert = require('./insert');
const list = require('./list');
const update = require('./update');
const remove = require('./remove');

module.exports = (collection) => ({
  find: (filter) => find(collection, filter),
  insert: (entity) => insert(collection, entity),
  list: (filter) => list(collection, filter),
  update: (filter, newSet) => update(collection, filter, newSet),
  remove: (filter) => remove(collection, filter),
});