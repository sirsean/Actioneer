/**
 * This binds a function's scope to a particular object.
 */
Function.prototype.bind = function(scope) {
  var _function = this;
  
  return function() {
    return _function.apply(scope, arguments);
  };
};

