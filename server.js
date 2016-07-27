var express = require('express');
var swig = require('swig');
swig.setDefaults({ cache: false });
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require('method-override');

var Product = require('./product.model');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join( __dirname, '/public')));
app.use(express.static(path.join( __dirname, '/bower_components')));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views');

app.get('/', function(req, res){
  var products = Product.filter({featured: true});
  res.render( 'index', { title: 'Home', products: products } );
});

app.use('/products', require('./products.routes'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
