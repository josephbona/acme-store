var router = require('express').Router();
var Product = require('./product.model');

router.get('/admin', function(req, res){
  res.render( 'admin', { title: 'Admin', products: Product.list() } );
});

router.get('/:id/edit', function(req, res){
  var product = Product.find(req.params.id*1);
  res.render( 'edit', { title: 'Edit Product', product: product } );
});

router.get('/add', function(req, res){
  res.render( 'add', { title: 'Add New Product' } );
});

router.get('/:id', function(req, res){
  var product = Product.find(req.params.id*1); 
  res.render( 'product', { 
    title: product.name,
    product: product 
  });
});

router.delete('/:id', function(req, res){
  Product.deleteItem(req.params.id*1);
  res.redirect('/products/admin');
});

router.put('/:id', function(req, res){
  Product.update(req.params.id*1, req.body.name, req.body.price*1, req.body.featured, req.body.image);
  res.redirect('/products/admin');
});


router.post('/', function(req, res){
  Product.add(req.body.name, req.body.price*1, req.body.featured, req.body.image);
  res.redirect('/products/admin');
});

router.get('/', function(req, res){
  res.render( 'products', { title: 'Products', products: Product.list() } );
});



module.exports = router;
