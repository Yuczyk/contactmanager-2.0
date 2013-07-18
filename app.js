var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api');
var app = module.exports = express();

app.configure(function() {
  app.locals.pretty = true;
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret!' }));
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.set('port', 8002);
  app.engine('html', require('ejs').renderFile);
});

app.get('/', routes.index); // main page
app.get('/p/:name', routes.p); //redirect routes

app.get('/api/contacts', api.contacts); //look at all
app.get('/api/contact/:id', api.contact); //look at one
app.post('/api/contact', api.add); //add application
app.put('/api/contact/:id', api.edit); //edit&update application
app.delete('/api/contact/:id', api.delete); //delete application
app.get('*', routes.index);

app.listen(1222, function(){
  console.log("Express server up and running for the API on port 1222.");
});