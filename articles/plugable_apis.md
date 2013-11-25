Title: Plug-able APIs [DRAFT]
Date: 24 Nov 2013
Tags: Best Practices, JavaScript, Opinion

The most important idea - or technique - I ever learned in JavaScript programming, I learned from looking through the jQuery source code.

The abstract idea is quite simple and even has a phrase in common use to describe it; 'Eat Your Own Dog Food'. Or in the case of an API; 'Consume Your Own API'. This will subtly affect many decisions during development.

## Nothing Built-In

OK, not nothing. But very little.

The first rule I set for myself is that the only thing that is built directly into the core of the API is the ability to augment, or change, the API itself. So methods to add something to the API, or remove, or overwrite are the only things that are put into the core. Then there will need to be some security around those methods to prevent tampering with them in some adverse way.

So the most important methods to add will be:

  1. Add - to add a new method to the API
  2. Remove - to remove an existing method from the API
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

## Conclusion

Now, this library is capable of augmenting itself and thus being self-testing by nature. There are some shortcomings of this overall design but that is beyond the scop of this article.
