var router = require('express').Router();
var productData = require('./product.model');

router.get('/product/:id/edit', function(req, res){
  var products = productData.find({id: req.params.id*1});
  res.render( 'edit', { title: 'Edit Product', products: products } );
});

router.get('/product/:id', function(req, res){
  var products = productData.find({id: req.params.id*1});
  res.render( 'product', { title: products[0].name, products: products } );
});
router.delete('/product/:id', function(req, res){
  productData.deleteItem(req.params.id*1);
  res.redirect('/admin');
});
router.put('/product/:id', function(req, res){
  productData.update(req.body.id*1, req.body.name, req.body.price*1, req.body.featured, req.body.image);
  res.redirect('/admin');
});

router.get('/products/add', function(req, res){
  var addID = productData.lastID()+1;
  res.render( 'add', { title: 'Add New Product', addID: addID } );
});

router.post('/products', function(req, res){
  productData.add(req.body.id*1, req.body.name, req.body.price*1, req.body.featured, req.body.image);
  res.redirect('/admin');
});
router.get('/products', function(req, res){
  var products = productData.getData();
  res.render( 'products', { title: 'Products', products: products } );
});

router.get('/admin', function(req, res){
  var products = productData.getData();
  res.render( 'admin', { title: 'Admin', products: products } );
});

router.get('/', function(req, res){
  var products = productData.find({featured: true});
  res.render( 'index', { title: 'Home', products: products } );
});

module.exports = router;
