function UserController () {

	var User = require('../models/userSchema.js');
	var passwordMailer = require('../mailers/password.js');
	var check = require('../utils/validator.js').validateParams;
	var commonUtils = require('../utils/common.js');
	var async = require('async');

	this.register = function (req, res, next) {

		var user = new User(req.params)
		user.save(function(err, data) {
			if(err) {
				console.log('err');
				console.log(err);
				return res.send(400, {data: err});
			}
			console.log(data);
			return res.send(200, {data: 'successfully registered'});
		});
	}

	this.login = function (req, res, next) {

		try {
      check('isEmail', 'Please provide a valid email address', req.params.email);
      check('isLength', 'Please provide a valid password', req.params.password, 3); //min length - assumed 3
    } catch (e) {
      return res.send(400, {data: e.message});
    }
		
		async.waterfall([
			
			User.findByEmail.bind(null, req.params.email),
			
			validatePassword.bind(null, req.params.password),

		], function errorChecker (err, data) {
			if (err) {
				return res.send(400, {data: err});
			}
			return res.send(200, {data: data});
		});
	}

	this.index = function (req, res, next) {
		async.waterfall([

			commonUtils.authenticateUser.bind(null, req.params.email, req.params.accessToken),

			User.findAll.bind(null),

		], function errorChecker (err, data) {
			if (err) {
				return res.send(400, {data: err});
			}
			return res.send(200, {data: data});
		});
	}

	this.forgotPassword = function(req, res, next) {
		async.waterfall([

			commonUtils.randomString.bind(null),

			User.setPassword.bind(null, req.params.email),

			passwordMailer.forgotPassword.bind(null, req.headers.host),

		], function errorChecker (err, data) {
			if (err) {

				console.log(err)
				return res.send(400, {data: err});
			}
			return res.send(200, {data: data});
		});
	}

	this.checkPasswordExpiry = function(req, res, next) {
		User.resetTokenExpiry(req.params.token, function(err, doc) {
			if(err) return res.send(400, {data: 'Password Reset Token Expired'});
      return res.send(200, {data: "ok"})
    });
	}

	this.resetPassword = function(req, res, next) {
		async.waterfall([

			User.resetTokenExpiry.bind(null, req.params.token),

		], function errorChecker (err, user) {
			if (err) {
				return res.send(400, {data: err});
			}

			user.password = req.params.password;
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;
			user.save(function(err, doc) {
				if (err) {
					return res.send(400, {data: err});
				}
				return res.send(200, {data: 'success'});
			});
		});
	}

	this.createSuperAdminIfNotPresent = function () {
    // only superadmin has the 'all' permission
    User.find({email: 'admin@cherryworks.com'}, function (err, data) {
      if (err) {
        console.log("FATAL --> DB ERROR", err);
        return;
      }

      // Super Admin not created. Create it
      if (data.length === 0) {

        var admin = new User({
          firstName: 'super',
          lastName: 'admin',
          phoneNo: '1231231233',
          email: 'admin@cherryworks.com',
          userName: 'superadmin',
          password: 'admin'
        });

        admin.save(function (err, body) {
          if (err) {
            return console.log("FATAL --> ADMIN CREATION ERROR");
          }
          return console.log("SUPER ADMIN CREATED");
        });

      } else {
        // SuperAdmin already created 
        return console.log("SUPER ADMIN ALREADY PRESENT");
      }

    });
  };

	function validatePassword(password, user, callback) {
		User.validatePassword(password, user.password, function (err, match) {
      if (err) {
        return callback(err);
      }

      if (!match) {
        return callback('Wrong username or password');
      }

      return callback(null, user);
    });
	}



	return this;

};

module.exports = new UserController();