/* 
 * Adding an extra file for validion in order to add custom validation functions
 */
var v = validator = require('validator');

/*
 *   
 * for each array element
 * check('method_name', 'error_message', 'arguments just like you call the method_name')
 * 
 * NOTE: DO NOT USER ISNULL AS methodName
 *
 */

exports.validateParams = function (methodName, errorMessage, args) {

  var args = Array.prototype.slice.call(arguments, 0);

  var method = args.shift(),
    message = args.shift();

  //console.log('method' ,method);
  //console.log('message' ,message);
  //console.log('args' , args);
  
  if ( typeof args[0] === 'undefined') {
    //console.log("1");
    console.log("did not find argument", args);
    throw ({message: errorMessage});
  }

  if (typeof v[methodName] === 'undefined') {
    //console.log("2", methodName);
    throw ({message: 'Bad method name'});
  }

  if (!v[methodName].apply(this, args)) {
    //console.log("3", args);
    throw ({message: errorMessage});
  }

}
