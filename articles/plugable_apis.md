Title: Plug-able APIs
Date: 30 Nov 2013
Tags: Best Practices, JavaScript, Opinion

The most important idea I ever learned in JavaScript programming, I learned from looking through the jQuery source.

The abstract idea is quite simple and even has a phrase in common use to describe it; 'Eat Your Own Dog Food'. Or in the case of an API; 'Consume Your Own API'. This will subtly affect many decisions during development.

## Nothing Built-In

OK, not nothing. But very little.

The first rule I set for myself is that the only thing that is built directly into the core of the API is the ability to augment, or change, the API itself. So methods to add something to the API, or remove, or overwrite are the only things that are put into the core. Then there will need to be some security around those methods to prevent tampering with them in some adverse way.

So the most important methods to add will be:

  1. Add - simply add a new method to the API if it doesn't already exist
  2. Remove - remove an existing method from the API
  3. Override - (optional) this is essentially doing the two steps above in a single call rather than forcing people to do them individually

Let's see some code.

*In these code samples I am going to not include the Command Pattern in an attempt to keep the focus on the topic of this article and not another.*

    // wrap implementation in an IIFE for cleanliness
    var library = (function () {
      var API;

      // provide #add() and #override()
      function addTo_API (name, fn) {
        API[name] = fn;
      }

      // provide #remove()
      function removeFrom_API (name) {
        delete API[name];
      }

      // add the functions as part of the API so they can be called
      API = {
        add: addTo_API,
        remove: removeFrom_API
      };

      // expose the public API
      return API;
    }());

Some use cases might look like the following:

    library.add('formatName', function (first, last) {/* ... */});
    var formattedName = library.formatName('Joshua', 'Kalis');

    library.add('commission', function (sales, points) {/* ... */});
    var commish1 = library.commission(42, 100);
    var commish2 = library.commission(100, 30);

    // looking for trouble
    library.add('commission', function () {/* do nothing */});
    var commish3 = library.commission(400, 100);
    // silent failure, commish3 is assigned the value 'undefined'

    // overwrite #add(), which will cause problems
    library.add('add', function () {/* do nothing */});
    library.add('somethingNew', function () {
      return 'something new';
    });
    library.somethingNew(); // TypeError: Object has no method 'somethingNew'

This first code sample accomplished a lot quickly. However, it does leave some holes in its implementation. The first is that the `add` functionality doesn't protect from overriding a method in the API. Second, we have no security around our core methods: add and remove.

## Secure The Core Methods

The first thing we should do is secure the core methods of the API so they cannot be tampered with either accidentally or not.

    // wrap implementation in an IIFE for cleanliness
    var library = (function () {
      var API
        , CORE_METHODS;

      // provide #add() and #override()
      function addTo_API (name, fn) {
        if (CORE_METHODS.indexOf(name) >= 0) {
          // throw an error because the program should not silently fail
          throw new Error('Attempting to change core method: ' + name);
        }

        API[name] = fn;
      }

      // provide #remove()
      function removeFrom_API (name) {
        delete API[name];
      }

      // add the functions as part of the API so they can be called
      API = {
        add: addTo_API,
        remove: removeFrom_API
      };

      // get an array of the core method names to check
      // against before adding anything new to the API
      CORE_METHODS = Object.keys(API);

      // expose the public API
      return API;
    }());

Now, immediately after we define the core methods for the API we cache an array of their names. That array of names is then used to prevent any attempts to over write those methods. Any attempts will result in an error being thrown.

    library.add('add', function () {/* anything */});
    // Error: Attempting to change core method: add

## Breakup Add And Override

The next step to be taken in securing this API and making it more explicit is to separate the functionalities of adding to and overriding existing methods in the API.

It's good to be explicit about this because of the silent failures and errors that could happen that make debugging difficult. If a method is defined and working and then re-defined elsewhere and causes working code to suddenly stop working that is often times very difficult to track down. Making the override feature more explicit makes it more obvious that it is happening and provides a point in the code to recognize that you might be doing something you shouldn't without restricting the library so much as to completely prevent the option.

    // wrap implementation in an IIFE for cleanliness
    var library = (function () {
      var API
        , CORE_METHODS;

      // provide #add()
      function addTo_API (name, fn) {
        coreMethodCheck(name);

        if (API[name]) {
          // throw an error because the program should not silently fail
          throw new Error('Attempting to override existing method: ' + name);
        }

        API[name] = fn;
      }

      function coreMethodCheck (name) {
        if (CORE_METHODS.indexOf(name) >= 0) {
          // throw an error because the program should not silently fail
          throw new Error('Attempting to change core method: ' + name);
        }
      }

      // provide #override()
      function overrideMethodIn_API (name, fn) {
        coreMethodCheck(name);

        API[name] = fn;
      }

      // provide #remove()
      function removeFrom_API (name) {
        delete API[name];
      }

      // add the functions as part of the API so they can be called
      API = {
        add: addTo_API,
        override: overrideMethodIn_API,
        remove: removeFrom_API
      };

      // get an array of the core method names to check
      // against before adding anything new to the API
      CORE_METHODS = Object.keys(API);

      // expose the public API
      return API;
    }());

Which I would probably suggest to be refactored into the following:

    // wrap implementation in an IIFE for cleanliness
    var library = (function () {
      var API
        , CORE_METHODS;

      // provide #add() and #override()
      function insertInto_API (override, name, fn) {
        if (CORE_METHODS.indexOf(name) >= 0) {
          // throw an error because the program should not silently fail
          throw new Error('Attempting to change core method: ' + name);
        }

        if (!override && API[name]) {
          // throw an error because the program should not silently fail
          throw new Error('Attempting to override existing method: ' + name);
        }

        API[name] = fn;
      }

      // provide #remove()
      function removeFrom_API (name) {
        delete API[name];
      }

      // add the functions as part of the API so they can be called
      API = {
        add: insertInto_API.bind(null, false),
        override: insertInto_API.bind(null, true),
        remove: removeFrom_API
      };

      // get an array of the core method names to check
      // against before adding anything new to the API
      CORE_METHODS = Object.keys(API);

      // expose the public API
      return API;
    }());

The reasons for this refactor are:

  * It will be easier to add pre and post execution functions to one location than it will be for two locations; more on this later.
  * This keeps similar code together for debugging and editing in the future.
  * Removes the need to abstract the 'CORE_METHODS check' into another function to be called multiple times.

## Advantages

Now you might be thinking that you could avoid all of what I have written so far by simply using an object literal for a library container and you would be correct; mostly. One feature that you would not have is the ability to automatically customize the methods being added with consistent functionality such as: logging, memoization, or pre/post execution hooks.

Say you created a library with the object literal pattern:

    var library = {
      someFunction: function (a, b) {
        /* ... */
      }
    };

If you wanted to add hooks, as mentioned above, to this function it would be trivial but how about as the library grows and the number of methods becomes very large? Basically, is maintaining one definition of a function easier than many of the exact same definition? Even if you abstract the hooks into a library function and call them where necessary it is still an implementation detail for each new method in the library to get correct; and if there is something we can be sure of, it is that humans make mistakes.

    var library = {
      _hook_post: function () {},
      _hook_pre: function () {},
      someFunction: function (a, b) {
        this._hook_pre();
        /* ... */
        this._hook_post();
      }
    };

This might work, but what about when the context of the method is changed? By accident or intentionally. That too can be fixed with binding the methods ahead of time but that is merely putting band-aid on a bigger problem.

Using the refactored code we have been building up in this article, adding this functionality becomes trivial. We can simply replace:

    // ...
        API[name] = fn;
    // ...

... with something like this:

    // ...
        API['pre_execution'] && API['pre_execution']();
        API[name] = fn;
        API['post_execution'] && API['post_execution']();
    // ...

There are more elegant ways to accomplish this but this should illustrate the point sufficiently. Depending on the need this could also be more robust allowing for further arguments to be passed in, or allowing these function to be passed in at runtime for more flexibility, the sky is the limit; JavaScript is so great!

## Conclusion

Now, this library is capable of augmenting itself and thus being self-testing by nature. There are some shortcomings of this overall design the biggest of which is that there is nothing preventing anyone using this library from changing the methods in the API directly - without using the add/override/remove methods provided - or changing the context - the value of the `this` variable - inside the methods being called. There may be others that are smaller but to mitigate all of these problems I would say that a new strategy would be needed; I would suggest the Command Pattern, and I have [written about that](//kalisjoshua.me/articles/commander_javascript) before.

Please let me know what I have missed or what I could have covered more completely, correctly, or accurately.