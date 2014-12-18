function UserController () {

	var User = require('../models/userSchema.js');
	var passwordMailer = require('../mailers/password.js');
	var check = require('../utils/validator.js').validateParams;
	var commonUtils = require('../utils/common.js');
	var async = require('async');
	var crypto = require('crypto');
	var J = require('../models/api/user.js');

	this.register = function (req, res, next) {

		var user = new User(req.params)
		user.save(function(err, data) {
			if(err) {
				return res.send(400, {data: err});
			}
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


	//should be exposed only for the admin.
	this.index = function (req, res, next) {

		var anchor_id = req.params.anchor_id || null;
		var docs_per_page = 10;
		User.findPaginated({ active: true }, function (err, docs) {
		 	if (err) {
				return res.send(400, err);
			}
			//need to change the response data as per the UI
			var result = {};
			J.as.public(docs.documents, {}, function(err1, data) {
				result['documents'] = data;
				result['totalPages'] = docs.totalPages;
				result['prevAnchorId'] = docs.prevAnchorId;
				result['nextAnchorId'] = docs.nextAnchorId;
				return res.send(200, result);	
			});
			
		}, docs_per_page, anchor_id);
	}

	this.show = function (req, res, next) {

		commonUtils.authenticateUser(req.params.email, req.params.accessToken, function errorChecker (err, data) {
			if (err) {
				return res.send(400, {data: err});
			}
			//need to change the response data as per the UI
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
				// console.log(err)
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

	this.findByEmail = function(req, res, next) {

		User.findByEmail(req.params.email, function(err, doc) {
			if (err) {
				return res.send(400, err);
			}
			J.as.public(doc, {}, function(err1, data) {
				return res.send(200, result);	
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
          userName: 'admin@cherryworks.com',
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

  this.changeBlockStatus = function(req, res, next) {
  	User.find({_id: req.params.id}, function (err, user) {
  		if (err) {
  			return res.send(400, err);
  		}
  		user.blocked = req.params.status;
  		user.save(function(err1, data) {
  			if (err1) {
  				return res.send(400, err1);
  			}
  			return res.send(200, data);
  		});
  	});
  } 

  // Guess we need to change the access token for the admin 
  // each login at least.

  this.adminLogin = function(req, res, next) {
  	try {
      check('isEmail', 'Please provide a valid email address', req.params.email);
      check('isLength', 'Please provide a valid password', req.params.password, 3); //min length - assumed 3
    } catch (e) {
      return res.send(400, {data: e.message});
    }
		
		async.waterfall([
			
			User.findByEmail.bind(null, req.params.email),
			
			validatePassword.bind(null, req.params.password),

			//use it only for admin right now
			setAccessToken.bind(null),

		], function errorChecker (err, data) {

			if (err) {
				return res.send(400, {data: err});
			}
			
			var doc = {
				"id": data._id,
				"email": data.email,
				"accessToken": data.accessToken,
				"firstName": data.firstName,
				"lastName": data.lastName,
				"phoneNo": data.phoneNo
			};
			
			return res.send(200, {data: doc});
		});
  }

	function validatePassword(password, user, callback) {
		//console.log(user);
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

	//only for Admin login currently
	function setAccessToken(user, callback) {

		var token = user.email + new Date();
    user.accessToken = crypto.createHash('md5').update(token).digest('hex');

    user.save(function(err, data) {
    	if (err) {
    		return callback(err);
    	}
    	return callback(null, data);
    });

	}



	return this;

};

module.exports = new UserController();