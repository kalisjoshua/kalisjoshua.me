## jQuery Plugins

Why, and How?

---

#### Why?

  * Portability
  * Reusability
  * Abstraction
  * Name-spacing
  * Security
  * Support

---

#### Portability

  * Include the same code in multiple projects
  * Encapsulated code can be distributed to the community

---

#### Reusability

  * Apply the same functionality to many different objects

```javascript
$("div.special").someCoolPlugin();

$("div.other").someCoolPlugin({different: "options"});

$("div.react").someCoolPlugin(function () {
  // wonderful event handler
});
```

---

#### Abstraction

  * Don’t clutter up your implementation code with plugin logic

```javascript
$(document)
  .ready(function ($) {
    var options = {
      background: "#ABABAB",
      color: "#EFEFEF"
      // other options definitions
    };

    $("#specialObject")
      .find("a")
        .css({
          background: options.background,
          color: options.color
          // other css definitions
        })
        .end()
      .fadeIn(function () {
        // custom callback code here
      });
});
```

---

#### Abstraction

  * Easier to look at and understand at a glance

```javascript
$(document)
  .ready(function () {
    $("#specialObject")
      .customPlugin({
        background: "#ABABAB",
        color: "#EFEFEF"
      });
  });
```

---

#### Name-spacing

  * Global values are evil
      - Could be overwritten or
      - Overwrite other variables

```javascript
var usefulVariable = 0;

var funStuff = function () {
  // perfect feature implementation
};

function eventHandler (event) {
  // respond to user interaction
}
```
---

#### Name-spacing

  * A better way
      - Still accessible to code
      - Yet more protected

```javascript
var myLib = {
  usefulVariable: 0,

  funStuff: function () {
    // perfect feature implementation
  },

  eventHandler: function (event) {
    // respond to user interaction
  }
};
```

---

#### Name-spacing

  * Name-spacing with the object-literal notation makes everything public

```javascript
var myLib = {
  usefulVariable: 0,

  funStuff: function () {
    // perfect feature implementation
  },

  eventHandler: function (event) {
    // respond to user interaction
  }
};

myLib.usefulVariable; // access value = 0
myLib.funStuff(); // call the function

myLib.eventHandler = function () {};
// oops, now the eventHandler has been reassigned
```

---

#### Security

  * You want private variables and methods?
      - We can do that using function scope...

```javascript
var Wierdo = function (str) {
  var hidden = "blah";

  this.func = function() {
    return hidden + " " + str;
  };
};
```

---

#### Support

  * Distributing plugins to the large user community has benefits
  * Many eyes looking at the code will be a strong crowd-sourced debug team
  * Public repositories
      - BitBucket (Mercurial)
      - Github (Git)
      - GoogleCode (Mercurial or SVN)
      - etc.

---

#### Final Reasons

  * It’s just plain easy to do
  * And it can be a lot of fun

---

#### Know These

  * Scope and implied global variables
  * IIFE (Immediately Invoking Function Expression)
  * “Closure” (potentially the most important)

---

#### JavaScript Scope

  * There is only function scope
  * The var keyword assigns a variable’s scope to its executing function
  * If scope is not assigned explicitly, it is implicitly made to be global

```javascript
var foo = "";
var scope = function () {
  foo = "bar";
};

console.log("foo =", foo); // value is ""
scope();
console.log("foo =", foo); // value is "bar"

/* ** */

var baz = "";
var scope = function () {
  var baz = "fiz";
};

console.log("baz =", baz); // value is ""
scope();
console.log("baz =", baz); // value is ""
```

---

#### IIFE

  * Immediately Invoking Function Expression
  * Formerly called Self-execution-anonymous-function
  * Sandbox some one-off logic in an anonymous function that will run only once

```javascript
foo = function () {
  // cool things happen in here
};

foo(); // execute the function
```

---

#### IIFE

  * Like algebraic variables, substitution applies here

```javascript
// step 1
foo = (function () {}); // define the function object

// step 2
foo(); // execute the function object

// step 3
(function () {})(); // execute a function without naming it
```

---

#### Closures

  * Definition: objects and functions have access to the scope in which they were created
  * Any variables in-scope when an object or function is created are available when that object or function is invoked

```javascript
var myAPI = (function (salt) {
  var privateValue = 1.23;

  return {
    calc: function (input) {
      return salt + input * privateValue;
    }
  }
}(2.1));

console.log(myAPI.calc(123.4)); // result is 153.882
```

---

#### Builder Functions

```javascript
var builder = function (privateValue) {
  return function (input) {
    return input * privateValue;
  };
}
var doubler = builder(2);

console.log(doubler(3)); // result is 6
```

---

#### How?

  * Use of the IIFE structure
      - Localize reference to jQuery object passed in
          + Small performance boost, not having to traverse scope
      - Hide private variables and functions

```javascript
(function ($) {
  // define private members
  var defaults = {
    // css values
    // numeric settings for: timeouts, effects, etc.
  },
  calc = function () {
    // custom hidden calculations
  };
}(jQuery));
```

---

#### jQuery Plugin

  * Assign the plugin function to the prototype object of jQuery
      - The “fn” property of jQuery is an alias to its prototype
      - The “this” keyword refers to the jQuery collection of objects inside the plugin function

```javascript
(function ($) {
  // define private members ...

  $.fn.pluginName = function () {
    // inside here the "this" keyword refers to the
    // jQuery collection of objects selected
  };
}(jQuery));
```

---

#### Put it Together

  * Use the private stuff and augment with user input
  * Maintaining chaining and the theory of jQuery

```javascript
(function ($) {
  // define private members ...

  $.fn.pluginName = function (options) {
    options = $.extend({}, defaults, options);

    // do cool stuff here for plugin...

    return this; // do not break chaining
  };
}(jQuery));
```

---

#### Using the Plugin

  * When properly done it will be useable by many object collections and within the chain

```javascript
$(function () {
  // synonymous with $(document).ready(function ($) {});

  $("a.specificClass")
    .pluginName()
    .click(function () {
      // event handler
    });

  $("a.notherClass")
    .hover(function () {
      // while hovering
    },
    function () {
      // after hovering
    })
    .pluginName()
});
```

---

## #Winning

... with jQuery

---

## Joshua T Kalis

March 2011
