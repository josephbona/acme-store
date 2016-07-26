var _ = require('lodash');
var faker = require('faker');
var data = [];

function add (id, name, price, featured, image) {
  data.push({ id: id, name: name, price: price, featured: featured, image: image });
}

function update (id, name, price, featured, image) {
  var toUpdate = this.getData().filter(function(item) {
    return item.id === id;
  })[0];
  var idx = this.getData().indexOf(toUpdate);
  this.getData()[idx].name = name;
  this.getData()[idx].price = price;
  this.getData()[idx].image = image;
}

function getData() {
  return data;
}

function deleteItem (id) {
  var toDelete = this.getData().filter(function(item) {
    return item.id === id;
  })[0];
  var idx = this.getData().indexOf(toDelete);
  this.getData().splice(idx, 1);
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties));
}

function lastID () {
  return _.last(data).id;
}

module.exports = { add: add, find: find, getData: getData, update: update, deleteItem: deleteItem, lastID: lastID };

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
