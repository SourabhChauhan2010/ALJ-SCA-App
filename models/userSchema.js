module.exports = (function UserSchema() {

  if (!process.env.CCK) { throw new Error('Cipherkey not set'); }
    var cipherKey = process.env.CCK;

    var crypto = require('crypto');
    var bcrypt = require('bcrypt');
    var SALT_WORK_FACTOR = 10;

    var encrypt = function (text) {
      if (cipherKey) {
        var cipher = crypto.createCipher('aes-256-cbc', cipherKey);
        var enc = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
        return enc;
      }
      else { throw new Error('Cipherkey not set'); }
    }

    var decrypt = function (text) {
      if (cipherKey) {
        if (text === null || typeof text === 'undefined') { return text; }
        var decipher = crypto.createDecipher('aes-256-cbc', cipherKey);
        var dec = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
        return dec;
      }
      else { throw new Error('Cipherkey not set'); 
    }
  }

  var mongoose = require('../db').mongoose;
  
  var schema = {
    accessToken: String,
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    registrationDate: { type: Date, required: true, default: Date.now },
    lastLoginDate: Date,
    email: { type: String, index: { unique: true } }, // used as login "username"
    phoneNo: { type: String, index: { unique: true } },
    userName: { type: String, index: { unique: true }, required: true},    
    role: { type: String },
    blocked: { type: Boolean, default: false}, // assuming only the admin can block
    password: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    avatarUrl: String,
    accounts: [
        {
            name: String,
            userId: String,
            password: { type: String, set: encrypt, get: decrypt },
            token: { type: String, set: encrypt, get: decrypt },
        }
    ],
    devices: [],
    active: { type: Boolean, default: true }

  };

  var collectionName = 'user';

  var userSchema = mongoose.Schema(schema);
  var User = mongoose.model(collectionName, userSchema);

  userSchema.pre('save', function(next) {

    var user = this;

    // hash the password only if it has been modified (or is new)
    if (user.isModified('password')) {

        var token = user.email + new Date();

        // change the accesstoken whenever the user data is changed
        user.accessToken = crypto.createHash('md5').update(token).digest('hex');

        // generate a salt
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

            if (err) return next(err);
            // hash the password along with our new salt
            bcrypt.hash(user.password, salt, function(err, hash) {

                if (err) return next(err);
                // override the cleartext password with the hashed one
                user.password = hash;

                next();
            })
        })
    }
    else { return next(); }
  })

// schema middleware
  User.validatePassword = function(candidatePassword, password, cb) {
    bcrypt.compare(candidatePassword, password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    })
  }

  User.findByEmail = function(email, callback) {
    //fields = fields || 'id firstName lastName email userName phoneNo avatarUrl accounts accessToken';
    User.findOne({ userName: email, active: true }, function (err, userDetail) {
      if (err) {
        return callback(err);
      }
      if (userDetail == null) {
        return cb('No such user exists');
      }
      if (userDetail.blocked) {
        return cb('User blocked by Admin. Please contact admin');
      }
      //console.log(userDetail);
      return callback(null, userDetail);
    });
  }

  User.findAll = function(user, cb) {
    // need to handle paginations
    fields = 'id firstName lastName email userName phoneNo avatarUrl accounts';
    User.find({ active: true }, fields, function (err, docs) {
      if (err) {
        return cb(err);
      }
      return cb(null, docs);
    });
  }

  User.setPassword = function(email, token, cb) {
    User.findOne({email: email, active: true}, function (err, user) {
      if (err || user == null) {
        err = err || "couldnt find such an user";
        return cb(err);
      }
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000;
      user.save(function (err1, doc) {
        if (err1) {
          return cb(err1);
        }
        return cb(null, doc);
      });
    });
  }

  User.resetTokenExpiry = function(token, cb) {
    User.findOne({resetPasswordToken: token, 
                  resetPasswordExpires: { $gt: Date.now() }}, function(err, user){

      if (err) return cb(err);
      return cb(null, user);
    });
  }

  // User.resetPassword = function(password, user, cb) {
  //   user.password = password;
  //   user.save()
  // }

  User.addDeviceInfo = function(token, type, user1, cb) {
    var device = {
      id: token,
      type: type
    };
    //User.find({id: user._id})
    User.findOne({email: user1.email, "devices.id": token, "devices.type": type, active: true}, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (user == null) {
        if (user1.devices == undefined || user1.devices.length < 1) {
          user1.devices = [device]
        }
        else {
          user1.devices.push(device);
        }
        user1.save(function (err, doc) {
          if (err) {
            return cb(err);
          }
          return cb(null, doc);
        })
      }
      else {
        return cb('Device already exists for the user');
      }
    });
  }

  User.removeDevice = function(device_id, user1, cb) {

    User.findOne({email: user1.email, "devices.id": device_id, active: true}, function (err, user) {

      if (err) {
        return cb(err);
      }

      if(user == null) {
        return cb('No such device exists');
      }

      else {
        var tmpDevices = user.devices;
        tmpDevices.forEach (function (deviceFromDb, index) {

          if(deviceFromDb.id == device_id) {
            user.devices.remove(deviceFromDb);
            user.save(function (err1, doc) {

              if (err) return cb(err1)

              else return cb(null, doc);

            });
          }

        });
      }
    });
  }

  User.authenticate = function(userName, accessToken, cb) {
    User.findOne({ userName: userName, accessToken: accessToken,  active: true }, function (err, doc) {
      if (err) {
        return cb(err);
      }    
      return cb(null, doc);
    });
  }

  return User;

})();
