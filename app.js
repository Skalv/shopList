var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shoplist');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DB connectée !")
});

var app = express();
var API = require('json-api');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// On récup nos models
var models = {
  "Item": require("./models/item").model
}
// On récup les registres
var registryTpl = {
  "item": require("./models/item").registry
}

// Config du paquet JSON-API
var adapter = new API.dbAdapters.Mongoose(models); 
var registry = new API.ResourceTypeRegistry(registryTpl, {"dbAdapter": adapter});
var docs = new API.controllers.Documentation(registry, {name: "Shop List API"});
var controller = new API.controllers.API(registry);
var front = new API.httpStrategies.Express(controller, docs);

var apiReqHandler = front.apiRequest.bind(front);

// Déclaration des routes
app.options('/api/*', function(req, res) {
  res.send(); // répond à toutes les requêtes OPTIONS
})

app.get('/api', front.docsRequest.bind(front)); // Renvois la doc de l'API.

var opts = ['item'].join('|');
// app.route('/api/:type(item|user|list)')`
app.route(`/api/:type(${opts})`)
  .get(apiReqHandler)
  .post(apiReqHandler);

app.route(`/api/:type(${opts})/:id`)
  .get(apiReqHandler)
  .put(apiReqHandler)
  .delete(apiReqHandler);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
