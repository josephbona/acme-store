var router = require('express').Router();
var productData = require('./product.model');

router.get('/product/:id/edit', function(req, res){
  var products = productData.find({id: req.params.id*1});
  res.render( 'edit', { title: 'Edit Product', products: products } );
});
router.get('/product/:id/delete', function(req, res){
  var product = productData.find({id: req.params.id*1});
  productData.remove(product);
  res.redirect('/admin');
});

router.get('/product/:id', function(req, res){
  var products = productData.find({id: req.params.id*1});
  res.render( 'product', { title: products[0].name, products: products } );
});

router.get('/products/add', function(req, res){
  var addID = productData.lastID()+1;
  res.render( 'add', { title: 'Add New Product', addID: addID } );
});
router.get('/products', function(req, res){
  var products = productData.list();
  res.render( 'products', { title: 'Products', products: products } );
});
router.post('/products', function(req, res) {
  if(req.body.method === 'put'){
    var product = productData.find({id: req.body.id*1})
    product.update(req.body.id*1, req.body.name, req.body.price, req.body.featured, req.body.image);
    // res.send('updating..')
  } else {
    productData.add(req.body.id*1, req.body.name, req.body.price, req.body.featured, req.body.image);
  }
  res.redirect('/admin');
});

router.get('/admin', function(req, res){
  var products = productData.list();
  res.render( 'admin', { title: 'Admin', products: products } );
});

router.get('/', function(req, res){
  var products = productData.find({featured: true});
  res.render( 'index', { title: 'Home', products: products } );
});

module.exports = router;
