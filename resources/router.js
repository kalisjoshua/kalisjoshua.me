var ofType = require('./ofType'),
    handlers = [],
    routes = [],

    routeHandlers = [routerCall, routerRegister];

function error(message) {

  throw new Error(message);
}

function routerCall(route) {
  var indx;

  indx = routes
    .reduce(function (found, current, indx) {
      if (found === -1) {
        // not found
        if (ofType.String(current) && route === current) {
          return indx;
        }

        if (ofType.RegExp(current) && current.test(route)) {
          return indx;
        }
      }

      return found;
    }, -1);

  return indx === -1 ? void 0 : handlers[indx];
}

function routerRegister(route, handler) {
  var indx;

  if (!ofType.Function(handler)) {
    error('Handler provided is not a "Function": ' + handler);
  }

  // a valid route is provided
  indx = routes.indexOf(route);

  if (ofType.Function(handlers[indx])) {
    error('Route already has a handler assigned.');
  }

  // add the new route and handler
  routes.push(route);
  handlers.push(handler);
}

function routerThrow(argLength) {
  // called with either too few or too many arguments
  error('Router called incorrectly - arguments.length: ' + (argLength || 0));
}

function router(route) {
  // if the route is wrong, nothing else matters
  if (ofType.String(route) || ofType.RegExp(route)) {

    return (routeHandlers[arguments.length - 1] || routerThrow)
      .apply(this, arguments || 0);
  } else {
    error('Route provided is not a "String" or "RegExp": "#"'
      .replace('#', route));
  }
}

router.empty = function () {
  handlers = [];
  routes = [];
};

module.exports = router;
