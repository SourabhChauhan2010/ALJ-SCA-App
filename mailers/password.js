var nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
var config = require('../config.js');

exports.forgotPassword = function (host, user, cb) {
  //host can be a global variable
  // transporter can be put into config
  var transporter = nodemailer.createTransport(ses({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey
  }));
  var mailOptions = {
    to: user.email,
    from: 'notifications@cherrywork.in',
    subject: 'Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + host + '/reset/' + user.resetPasswordToken + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  transporter.sendMail(mailOptions, function(err) {
    if (err) return cb(err);
    return cb(null, 'done');
  });
}