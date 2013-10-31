/*jshint laxcomma:true*/

var handlers = []
  , routes = [];

function ofType (type, obj) {
  return type.test(({}).toString.call(obj));
}

function ofTypeFunction (obj) {
  return ofType(/function/i, obj);
}

function ofTypeRegExp (obj) {
  return ofType(/regexp/i, obj);
}

function ofTypeString (obj) {
  return ofType(/string/i, obj);
}

function router (route, handler) {
  var argLength = arguments.length
    , indx;

  // if the route is wrong, nothing else matters
  if (!(ofTypeString(route) || ofTypeRegExp(route))) {
    throw new Error('Route provided is not a "String" or "RegExp": ' + route);
  }

  switch (argLength) {
    case 2: // if argLength is 2, a route and handler were passed in
      if (!ofTypeFunction(handler)) {
        throw new Error('Handler provided is not a "Function".');
      }

      // a valid route is provided
      indx = routes.indexOf(route);

      if (ofTypeFunction(handlers[indx])) {
        throw new Error('Route already has a handlers assigned.');
      }

      // add the new route and handler
      routes.push(route);
      handlers.push(handler);

      break;

    case 1: // if only one argument is provided, only a route was passed in
      indx = routes
        .reduce(function (found, _route, indx) {
          if (found === -1) {
            // not found
            if (ofTypeString(_route) && route === _route) {
              return indx;
            }

            if (ofTypeRegExp(_route) && _route.test(route)) {
              return indx;
            }
          }

          return found;
        }, -1);

      if (indx === -1) {
        return;
      }

      return handlers[indx];

    default:
      // called with either too few or too many arguments
      throw new Error("Router called incorrectly - arguments.length: " + (argLength | 0));
  }
}

module.exports = router;