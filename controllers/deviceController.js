function DeviceController() {
	var async = require('async');
	var User = require('../models/userSchema.js');
	var commonUtil = require('../utils/common.js');
	var check = require('../utils/validator.js').validateParams;

	this.add = function (req, res, next) {

		async.waterfall([

			commonUtil.authenticateUser.bind(null, req.params.email, req.params.accessToken),

			User.addDeviceInfo.bind(null, req.params.token, req.params.type),

		], function errorChecker (err, data) {
			if (err) {
				return res.send(400, {data: err});
			}
			return res.send(200, {data: data});
		});
	}

	this.show = function (req, res, next) {

		commonUtil.authenticateUser(req.params.email, req.params.accessToken, function errorChecker (err, data) {
			
			if (err) {
				return res.send(400, {data: err});
			}

			return res.send(200, {data: data.devices});
		});
	}

	this.remove = function(req, res, next) {

		async.waterfall([

			commonUtil.authenticateUser.bind(null, req.params.email, req.params.accessToken),

			User.removeDevice.bind(null, req.params.id),

		], function errorChecker (err, data) {
			if (err) {
				return res.send(400, {data: err});
			}
			return res.send(200, {data: data});
		});
	}

	return this;
};

module.exports = new DeviceController();