var faker = require('faker');
var data = [];

function add (name, price, featured, image) {
  var product = {name: name, price: price, featured: featured, image: image };
  var max = 0;
  max = this.list().reduce(function(max, product){
    if(product.id > max)
      max = product.id;
    return max;
  }, 0);
  max++;
  product.id = max;
  this.list().push(product);
}

function update (id, name, price, featured, image) {
  var product = this.find(id);
  product.name = name;
  product.price = price;
  product.image = image;
}

function list() {
  return data;
}

function deleteItem (id) {
  var product = this.find(id);
  var idx = this.list().indexOf(product);
  this.list().splice(idx, 1);
}

function find (id) {
  return this.list().filter(function(product){
    return product.id === id;
  })[0];
}

function filter(attributes){
  //TODO actually filter
  return this.list();
}


module.exports = {
  add: add, 
  find: find,
  list: list,
  update: update,
  deleteItem: deleteItem,
  filter: filter
  };

// generate some products
for (var i = 0; i < 9; i++) {
  module.exports.add(
    faker.commerce.productName(),
    faker.commerce.price(),
    ((i < 3) ? true : false),
    'http://placehold.it/400x400'
   );
}
