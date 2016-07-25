var _ = require('lodash');
var faker = require('faker');
var data = [];

function add (id, name, price, featured, image) {
  data.push({ id: id, name: name, price: price, featured: featured, image: image });
}

function update (id, name, price, featured, image) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.featued = featured;
  this.image = image;
}

function remove (el) {
  data = _.without(data, el);
}

function list () {
  return _.cloneDeep(data);
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

function lastID () {
  return _.last(data).id;
}

module.exports = { add: add, list: list, find: find, update: update, remove: remove, lastID: lastID };

// generate some products
for (var i = 0; i < 9; i++) {
  module.exports.add(
    i+1,
    faker.commerce.productName(),
    faker.commerce.price(),
    ((i < 3) ? true : false),
    'http://placehold.it/400x400'
   );
}
console.log(data);
