# Airbnb Style Guide Diff
## 11 Nov 2013

I agree with almost everything in the [Airbnb JavaScript Style Guide](//github.com/airbnb/javascript). I will discuss some of my discrepancies with it. I will admit that I have been influenced by the one, the only, Douglas Crockford (papa-Crock).

Some - if not most - of my reasoning may be subjective but when your primary responsibility is to author / edit code - no matter the language - you should make it as enjoyable an experience as possible. There is a delicate balance that must be kept between execution performance and developer experience; with most conflicts being resolved in favor of performance as that is what will impact the end user.

## Functions

I will include the code sample from the original publication here for comparison to what I think is better.

    // language = javascript
    // anonymous function expression
    var anonymous = function() {
      return true;
    };

    // named function expression
    var named = function named() {
      return true;
    };

    // immediately-invoked function expression (IIFE)
    (function() {
      console.log('Welcome to the Internet. Please follow me.');
    })();

I like adding an additional space before the arguments list - in parens - to help the future developer while scanning the code to realize that it is a function definition and not a call (invocation). Even though the `function` keyword precedes and looks nothing like an invocation due to the following curlies.

I also like to bring the invoke-ing parens inside the wrapping parens when writing an Immediately-Invoked Function Expression (IIFE). I admit that I originally followed this from The Crockford but I have grown to like it as it feels more natural to type; the entire statement is in the enclosing parens and the only character outside is the semicolon.

    // language = javascript
    // anonymous function expression
    var anonymous = function () {
      return true;
    };

    // named function expression
    var named = function named () {
      return true;
    };

    // immediately-invoked function expression (IIFE)
    (function () {
      console.log('Welcome to the Internet. Please follow me.');
    }());

The fact is this has no impact on performance either in un-minified nor compressed JavaScript. If there is no down-side and there is a possible up-side why not add a little more readability?

One more for good measure.

Here is the original sample:

    // language = javascript
    // good
    function yup(name, options, args) {
      // ...stuff...
    }

... and, mine:

    // language = javascript
    // better
    function yup (name, options, args) {
      // ...stuff...
    }

## Variables

I like the reasoning for the variables organization / ordering but disagree on a slightly higher level.

For some background, I like to be organized almost to a fault. I'm not sure where I picked this up but it might help to explain me a little more. Paraphrased:

  > Person1 : So, you're OCD?

  > Person2 : OCD?

  > Person1 : Obsessive Compulsive Disorder. OCD.

  > Person2 : Oh. No. I suffer from CDO. It's like OCD but in alphabetic order, as it should be.

So I like to alphabetize my code as much as I can. It helps me with deciding where something new 'should' be placed. I used to rely on grouping 'like things' but that introduces subjectivity; one person might think that certain functions go together based on criteria A, when I am grouping by criteria B. Alphabetic means there is an external, widely-known, and accessible ordering that can be applied reliably by anyone editing the code.

This extends beyond JavaScript so, for instance, I also alphabetize HTML element attributes - including class names and data attribute values - and CSS selectors. Of course there are exceptions that must be made because of programming logic precedence; I don't let the logic of an application dictate the naming of variables nor do I approve of inserting meaningless letters at the beginning of a variable name in order to get them into the alphabetic order I like to achieve.

Here is the original sample:

    // language = javascript
    // good
    var items = getItems(),
        goSportsTeam = true,
        dragonball,
        length,
        i;

.. and, mine:

    // language = javascript
    // better
    var dragonball,
        goSportsTeam = true,
        i = 0,
        items = getItems(),
        length;

## Whitespace

Another restriction I like to pose upon my code is that I don't like to include large blocks of code in the declaration section of a function. What I mean is that I like each variable being declared to have one and only one line in the declaration section.

Here is the original sample:

    // language = javascript
    // bad
    var leds = stage.selectAll('.led').data(data).enter().append('svg:svg').class('led', true)
        .attr('width',  (radius + margin) * 2).append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

    // good
    var leds = stage.selectAll('.led')
        .data(data)
      .enter().append('svg:svg')
        .class('led', true)
        .attr('width',  (radius + margin) * 2)
      .append('svg:g')
        .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
        .call(tron.led);

What I like to do is bring all of that logic down away from the declaration. That way the declaration section of functions is more easily scan-able.

.. and, mine:

    // language = javascript
    // better
    var leds;

    leds = stage
      .selectAll('.led')
      .data(data)
      .enter()
      .append('svg:svg')
      .class('led', true)
      .attr('width',  (radius + margin) * 2)
      .append('svg:g')
      .attr('transform', 'translate(' + (radius + margin) + ',' + (radius + margin) + ')')
      .call(tron.led);

Another example might make it more clear:

    // language = javascript
    // bad
    var $groupOfElement = $('.someParentObject')
          .find('.targetElements')
          .filter(function (indx, element) {
            // ... do some stuff.
          }),
        $labels = $('label'),
        $objectsOfInterest = $('.interesting')
          .each(function () {
            // ... do some stuff.
          })
          .on('click', function (event) {
            // ... do some stuff.
          }),
        $otherElements = $('.others');

    // good
    var $groupOfElement,
        $labels = $('label'),
        $objectsOfInterest
        $otherElements = $('.others');

    groupOfElement = $('.someParentObject')
      .find('.targetElements')
      .filter(function (indx, element) {
        // ... do some stuff.
      });

    objectsOfInterest = $('.interesting')
      .each(function () {
        // ... do some stuff.
      })
      .on('click', function (event) {
        // ... do some stuff.
      });

Hopefully it is obvious that the second sample is easier to understand the variables being declared at a glance and if the developer would like to know more they can look at the details below for the variable they are interested in.

## Commas

I don't personally have a strong aversion to the 'comma-first' style and in fact like it for my personal projects; as somewhat of an experiment and haven't had reason to abandon them yet. But at work more people dislike it than like it so I write in the standard form suggested by the consensus.

## Accessors

The idea of 'being consistent' is the only thing that I agree with in this section. The rest of the rule seem to me to be more of programming style or design patterns rather than coding standards. I don't like the example given at the end showing a simple set of a getter and setter.

Here is the original sample:

    // language = javascript
    function Jedi(options) {
      options || (options = {});
      var lightsaber = options.lightsaber || 'blue';
      this.set('lightsaber', lightsaber);
    }

    Jedi.prototype.set = function(key, val) {
      this[key] = val;
    };

    Jedi.prototype.get = function(key) {
      return this[key];
    };

I think that a pattern like this puts too much burden on single functions for all instantiated objects: `get` and `set`. If this pattern is used then all validation and error checking for all values being set on objects need be in a single function.

I think a better patter is to have a single function for getting and setting each property necessary. This way the specific validation and error checking logic for a specific property is consolidated into a location which makes sense and is where it will be found if looked for.

.. and, mine:

    // language = javascript
    function Jedi (options) {
      options || (options = {});
      var lightsaber = options.lightsaber || 'blue';
      this.lightsaber(lightsaber);
    }

    Jedi.prototype.lightsaber = function(val) {
      if (arguments.length === 1) {
        // ... more validation before setting a value
        this._lightsaber = val;
      }

      if (arguments.length === 0) {
        return this._lightsaber;
      }
    };

## Conclusion(s)

With the exception of the [Accessors](#Accessors) I don't think that anything I have identified here in this article would cause any problems outside preferential experience.

I think the most important rule after performance is consistency. Every effort should be made to remain consistent across rules so that one rule is not conflicting with another.

## Additions

There are, however, some things that were not spelled out in the style guide and that could leave some openings for inconsistency such as the following:

## Whitespace Extended

  1. A whitespace character should follow every keyword or control structure (with a few exceptions):

          // language = javascript
          // bad
          if(this === that) {}
          while(limit--) {}
          return(isValid ? something : nothing);

          // good
          if (this === that) {}
          while (limit--) {}
          return isValid ? something : nothing;

          // exceptions
          break;
          case:
          return;
          this.<property>

    *For keywords that have a following set of parens this will again reinforce that it is not a function invocation.*

  2. No leading or trailing space should be included in a group of statements:

          // language = javascript
          // bad
          { "name": "Homer" }
          [ 1, 2, 3 ]
          function ( a, b, c ) {}
          alert( 'Hello World!' );

          // good
          {"name": "Homer"}
          [1, 2, 3]
          function (a, b, c) {}
          alert('Hello World!');

    *This follows from the rule to be consistent as often as possible.*

          // language = javascript
          // bad
          myObject = { };
          myArray = [ ];
          myObject.toString( );

          // good
          myObject = {};
          myArray = [];
          myObject.toString();

  3. A whitespace character should be included before and after operators:

          // language = javascript
          // bad
          if (arguments.length===2) {}
          var result=a+b;

          // good
          if (arguments.length === 2) {}
          var result = a + b;

    *The additional whitespace in these instances helps improve readability.*

## Commas Extended

The one additional rule I would add to the commas section is, 'Every comma should be followed by a single whitespace character or newline.'

## Final Conclusion

The more explicit we can be without imposing too much restriction - to the point of limiting the effectiveness of a developer - the better I think. The bigger problem is getting to a point where a large majority agree on standards. I think we are getting better, but we still can make improvements.

**Tags**

  + [JavaScript](/#filter=JavaScript)
  + [Best Practices](/#filter=Best Practices)
  + [Opinion](/#filter=Opinion)
