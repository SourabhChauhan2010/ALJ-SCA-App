var bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: 'cw-user',
  streams: [
    {
      level: 'info',
      stream: process.stdout           // log INFO and above to stdout
    },
    {
      level: 'error',
      //path: '/var/log/myapp-error.log'  // log ERROR and above to a file
      stream: process.stdout
    }
  ]
});

exports.info = function(message) {
  log.info(message);
}

exports.success = function(message) {
  log.info(message);
}

exports.error = function(message) {
  log.error(message);
}

exports.log_request = function(req, res, next) {
  var request = {};
  request['request_ip'] = req.connection.remoteAddress;
  request['request_url'] = req.url;

  log.info({'request' : request});
}