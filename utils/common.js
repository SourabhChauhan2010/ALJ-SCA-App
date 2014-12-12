var User = require('../models/userSchema.js');
var crypto = require('crypto');

exports.authenticateUser = function (email, accessToken, callback) {
	User.authenticate(email, accessToken, function (err, user) {
		if (err) {
			return callback(err);
		}

		if (user == null) {
			return callback('Invalid accessToken');
		}

		if (user.blocked) {
			return cb('User blocked by Admin. Please contact admin');
		}
		
		return callback(null, user);
	});
}

exports.randomString = function (callback) {
	var date = new Date();
	var token = crypto.createHash('md5').update(date.toString()).digest('hex');
	return callback(null, token);
}