var config = require('./config');
var mongoose = require('mongoose');

//console.log('inside db');
mongoose.connect(config.dbPath);

var db = mongoose.connection;

db.on('error', function dbError() {
  console.log('error from the db'); //TODO
});

db.once('open', function dbOpen() {
  console.log('successfully opened the db');
});

exports.mongoose = mongoose;
