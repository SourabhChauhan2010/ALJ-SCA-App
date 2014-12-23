module.exports = (function User() {
  var J = require('jiggler');
  
  J.define('public', [
    J.Field('_id'), 
    J.Field('firstName'), 
    J.Field('lastName'),
    J.Field('email'), 
    J.Field('phoneNo'),
    J.Field('blocked'),
    J.Field('avatarUrl')
  ]);

  J.define('private', [
    J.Field('_id'), 
    J.Field('firstName'), 
    J.Field('lastName'),
    J.Field('accessToken'),
    J.Field('email'), 
    J.Field('phoneNo'),
    J.Field('blocked'),
    J.Field('avatarUrl')
  ]);

  return J;
})();
