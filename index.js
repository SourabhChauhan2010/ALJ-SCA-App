var restify = require('restify'),
  logger = require('./logger'),
  config = require('./config');

var app = restify.createServer({name: 'cw-user'});

app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());

app.on('uncaughtException', function (req, res, route, err) {
  console.log("err", err.stack);
  res.send(500, err.message);
});

app.listen(config.port, function () {
  logger.info(app.name + ' listening on port: ' + app.url);
});

var routes = require('./routes')(app);

