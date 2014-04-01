function ofType(type, obj) {
  var typeString;

  if ('string' === typeof type) {
    type = new RegExp(type);
  }

  typeString = ({}).toString
    .call(obj)
    .split(' ')
    .pop();

  return type.test(typeString);
}

'Array Boolean Function Number Object RegExp String'
  .split(' ')
  .forEach(function (type) {
    ofType[type] = function (obj) {

      return ofType(new RegExp(type), obj);
    };
  });

module.exports = ofType;
