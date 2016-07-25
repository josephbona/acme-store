var express = require('express');
var swig = require('swig');
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
app.set('views', __dirname + '/views')
swig.setDefaults({ cache: false });

var routes = require('./products.routes');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/', routes);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
