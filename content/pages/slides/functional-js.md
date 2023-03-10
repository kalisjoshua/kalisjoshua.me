## Functional Javascript

### Wat?!

---

## Why Functional?

---

#### Write Better Code

**Greater Confidence**

Testable code promotes reliable re-writing and can be objectively ensured to have fewer bugs. Who wants to fix code that was thought to already have been fixed?

**Increased Productivity**

Safe, stable code can be relied on and you can move onto other, more important or interesting, projects. Composing preexisting code will reduce new code and require fewer tests.

**Easier Comprehension**

Shorter, more focused, code is easier to grasp for yourself and other developers. Fewer lines of code means fewer chances for things to go wrong.

---

## SO!

### What does it all mean?

---

## Moar Laziness!

---

## Hooked?

### Good, now some boring stuff.

---

#### Agenda

  1. Introduction
      - Why Javascript?
      - Programming Paradigms
  2. Functional Programming Concepts
      - Functional Javascript snippets
  3. Code Refactoring Examples
  4. Questions
  5. Teach myself - basically I don't care about any of you

---

#### Me

  * Front-end engineer for [@QuickenLoans](http://twitter.com/@QuickenLoans)
  * website [JoshuaKalis.com](http://joshuakalis.com)
  * twitter.com/[@kalisjoshua](http://twitter.com/kalisjoshua)

---

#### Brief experience time-line

  1. Started as a Graphic Designer, NOT a programmer
  2. Moved to Web Design through images first then CSS and HTML
  3. Picked up ASP Classic
  4. Forced to learn Javascript (HATED all of it!)
  5. Learned a little of these: PHP4, C# .NET 2.0, Java
  6. Began to LOVE Javascript

*Self-taught mostly.*

---

## Hi, my name is Josh.

### I <3 Javascript. I might be biased.

---

#### Javascript has a LOT of BAD parts!

  * Variables are free to be overwritten at any time
  * Type coercion within equality checks are unreliable
  * The 'this' value can be tricky for n00bs (as well as everyone else from time to time)
  * Blocks are optional for control structures
  * Switch fall-through
  * The 'arguments' object inside function calls
  * Automatic semi-colon insertion
  * The difference in function statements and expressions
  * Misunderstood misused constructs: eval, with, continue, void
  * Typed wrappers: new Boolean(true), new Number(9), new Array(), etc.
  * new (necessary at times but...)
  * Unused reserved words
  * Unicode
  * The typeof operator is in accurate
  * Floating point numbers: 0.1 + 0.2 !== 0.3 // true
  * The plus (+) operator for [addition concatenation infix]
  * Hoisting
  * NaN... Nyan cat?
  * and (many) more... :(

---

#### What is there to love about Javascript?

  * Ubiquitous
      - It's almost everywhere
      - Setup is done for you
  * Forgiving
      - Making mistakes might still achieve the goal you want
      - Easy to start programming
  * Useful
      - People like having interactive web pages
      - Employable skill
  * Multi-paradigm
      - Write however you want
  * ... and more (probably) but lets move on

---

#### Main Programming Paradigms ([source](http://people.cs.aau.dk/~normark/prog3-03/html/notes/paradigms_themes-paradigm-overview-section.html))

  * Imperative, Procedural, or Structured
      - 1954 FORTRAN
      - "First do this and next do that"
  * Object Oriented
      - 1960s Simula 67
      - "Send messages between objects to simulate the temporal evolution of a set of real world phenomena"
  * Functional
      - 1960s LISP
      - "Evaluate an expression and use the resulting value for something"
  * Others? - [yes, there are lots](http://en.wikipedia.org/wiki/Programming_paradigm#Programming_paradigms)

---

#### Imperative

```javascript
var message = 'Hello ';
var promptMessage = 'What is your name?';
var name = prompt(promptMessage);
alert(message + name);
```

  1. Set some variables.
  2. Ask the user for their name and store that to a variable.
  3. Finally, greet them with a message including their name.

Do we see the 'Procedure' here?

  > "... describes computation in terms of statements that change a program state." ~~ [wikipedia](http://en.wikipedia.org/wiki/Imperative_programming)

---

#### Object Oriented

```javascript
function Greeting () {
    this.name = prompt(Greeting.promptMessage);
}

Greeting.promptMessage = 'What is your name?'; // static(-like) property
Greeting.prototype.say = function (message) {  // inherited function
    alert(message + this.name);
}

var personalGreeting = new Greeting();

personalGreeting.say('Hello ');
```

Here we gain some re-usability, albeit with some verbosity.

  1. Define a 'class'; see the quotes, because Javascript doesn't truly have classes.
      - Added a 'static' property; that is publicly available
      - Added a type-based method; prototypically inherited by all instances
  2. Create an instance of the 'class' with an instance variable of the user's name.
  3. Greet the user with a message including their name.

---

#### I write non-functional Javascript

Just to set you at ease, I am not a functional Javascript doyen writing everything in a functional manner. Actually, from time to time, I even write Javascript that doesn't even function.

```javascript
function myAwesomeness (arg) {
  // perform some intense computation on arg
  // fully unit tested
  // purely functional
  // return some computed value
}

// ...

var myVar = myAwesomeness(); // derp derp
```

---

#### One Big Difference

**Imperative and Object Oriented**

Focus is on 'how' to accomplish the desired outcome.

**Functional**

Focus is on 'what' to do to accomplish the desired outcome.

---

#### Fair Warning

Functional Programming might infect your brain and change the way that you think about problems. You might find yourself re-evaluating old code and saying something similar to:

  > "The small experience I've had with #Haskell is already changing the way I write #JavaScript, mostly regarding avoiding side effects." ~~ [@tlhunter](https://twitter.com/tlhunter/status/262648059442376704 )

---

#### What is Functional?

  > "In computer science, functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids state and mutable data. It emphasizes the application of functions, in contrast to the imperative programming style, which emphasizes changes in state. Functional programming has its roots in lambda calculus, a formal system developed in the 1930s to investigate function definition, function application, and recursion. Many functional programming languages can be viewed as elaborations on the lambda calculus." ~~ [wikipedia](http://en.wikipedia.org/wiki/Functional_programming)

---

## That's Boring!

### And what...?

---

#### What does functional mean?

Here are the topics I found to be most talked about within the FP research that I performed for this talk.

  * Purity
  * Functions as Values
  * Higher Order Functions
  * Closure
  * Currying
  * Partial Application
  * Composition
  * Lazy Evaluation
  * Continuations
  * Continuation Passing Style (CPS)

---

#### Impurity

Relying on side effects leads to problems and brain-ache.

```javascript
var sum = 0;

function addToSum (a) {
  sum += a;
  return sum;
}

addToSum(1); // returns 1
addToSum(2); // returns 3
sum = 0;
addToSum(3); // returns 3 -> WTF!
```

This code is reliant on no other programmers changing the value of sum (intentionally or otherwise); it is also not testable over the life of execution because of that.

---

#### Purity

  * Referential transparency
  * Computation is the evaluation of mathematical functions
  * One input set will yield the same output every time

```javascript
function sum (a, b) {
  return a + b;
}

// ...

sum(1, 2); // returns 3, every time.
```

This is referentially transparent, meaning it can be logically reasoned about and the input dictates the output. Testing this will be straight-forward and reliable.

---

#### Functions as values

A function is a 'value' that can be assigned to an 'identifier'.
This declaration:

```javascript
function add (a, b) {
  return a + b;
}
```

... is very similar to this expression:

```javascript
var add = function (a, b) {
  return a + b;
}
```

The only difference being when they are initialized in the Javascript interpreter. The end result is the same; a function identified as 'add'.
  > "Function Expressions and Functional Programming are inseparable." ~~ [JavaScript JavaScript](http://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)

---

#### Higher Order Functions

  * Takes a function as an argument (or)
  * Returns a function as a result

Examples: Array mutators, Event Handlers, etc.

##### Functions as arguments

```javascript
[1, 2, 3, 4, 5, 6]
  .map(function (num) {
    return num * 3.14159;
  });
```

---

#### Higher Order Functions (cont.)

Examples: bind, 'factories', etc.

**Functions as returned values**

```javascript
// add factory
function makeAdder (baseValue) {
  return function (x) {
    return baseValue + x;
  };
}

var add5 = makeAdder(5);

add5(10);   // returns 15
add5(1000); // returns 1005
add5(-4);   // returns 1
```

or...

```javascript
function add (a, b) {
  return a + b;
}

var add5 = add.bind(null, 5); // partial function application 'topic coming soon'
```

---

#### IIFE - Immediately Invoked Function Expression

And now for a little (Algebraic) Substitution. The two equations below are equal.

  * 3 * (1 + 2) = 9
  * 3 * (3) = 9

```javascript
var add = function (a, b) {return a + b;};

add(1, 2); // returns 3 every time

// Baby step, remember from math class, parens are just grouping
(add)(1, 2); // returns 3 every time

// Here is the IIFE
(function (a, b) {return a + b;})(1, 2); // returns 3 every time
```

---

#### Closure (lexical scoping)

Objects retain access to the context (scope) in which they were created.

```javascript
var outterObj = (function () {
  var hidden = 'I have a secret.';

  // return this object to outterObj
  // privileged methods inside have access to 'hidden' through closure
  return {
    get: function () {
      return hidden;
    }
    , set: function (newValue) {
      hidden = newValue;
    }
  };
}());

outterObj.get();  // returns 'I have a secret.'
outterObj.set('Javascript is awesome!');
outterObj.get();  // returns 'Javascript is awesome!'
outterObj.hidden; // undefined
```

---

#### Scope Chain

Let's take a little side step for a second. Behold the ASCII diagram.

```
program execution drills down through scopes building a scope chain
          ↓
+-------------------+
|    Global Scope   | <-- default location for variables
|-------------------|
| Namespace Context | <-- single global namespace object
|-------------------|
|    IIFE Context   | <-- variables instantiated with 'var' inside
|-------------------|
|        ...        |
|-------------------|
|  Binding Context  | <-- functions can have a binding context
|-------------------|
| Execution Context | <-- argument values and closure variables
+-------------------+
          ↑
variable resolution looks up the scope chain
finding the reference or hitting global and returning undefined
```

---

#### Currying
  > "...transforming a function that takes n multiple arguments [into] a chain of functions, each with a single argument..." ~~ [wikipedia](http://en.wikipedia.org/wiki/Currying)

This might take some explanation to fully grasp; it did for me anyway.

```javascript
function sumOfSix (a, b, c, d, e, f) {
  return a + b + c + d + e + f;
}

sumOfSix(1, 2, 3); // some argument values will be undefined

                   // curry is a fictitious function here
var sumOfSixCurried = curry(sumOfSix);
sumOfSixCurried(1);       // returns a new function expecting one argument
sumOfSixCurried(1)(2);    // returns a new function expecting one argument
sumOfSixCurried(1)(2)(3); // returns a new function expecting one argument
sumOfSixCurried(1)(2)(3)(4)(5)(6); // returns 21
```

---

#### Partial Application

Reducing the number of needed arguments by supplying values ahead of time.

```javascript
function add (a, b) {
  return a + b;
}

var add5 = add.bind(null, 5);

add5(10); // returns 15
add5(-4); // returns 1
```

The bind method on the Function prototype allows us to do two things: explicitly set the context a function will execute with - value of 'this' inside the function - and supply arguments that will be available when the function is called.

[Partial Application in JavaScript by Ben Alman](http://benalman.com/news/2012/09/partial-application-in-javascript/)

```javascript
// !WARNING! unsafe for actual use
function partial (fn) {
  var args = [].slice.call(arguments, 1);     // get all arguments after the first
  return function () {
    fn.apply(null, args.concat(arguments)); // add args to partially applied args
  }
}
```

---

#### Composition

A new function that, when called, will pass the output of one function call as the input of the next and so on through all functions in the composition.

```javascript
function fnA (_) { return _ + 2; }
function fnB (_) { return _ * 3; }
function fnC (_) { return _ - 5; }

var resultA = fnA(7);           // 9
var resultB = fnB(resultA);     // 27
var resultC = fnC(resultB);     // 22

// or

var result = fnC(fnB(fnA(7)));  // 22
```

with composition:

```javascript
var compositionABC = compose(fnA, fnB, fnC);
var result = compositionABC(7);             // 22

// ...

var map = [13, 17, 23].map(compositionABC); // [40, 52, 70]
```

Composition reduces the number of times the list is iterated over from once per function in the composition to just once. Benefits: reusable, passable, composable, testable, scalable etc.

---

#### Lazy evaluation

Known as Generators, Sequences, or Streams ([StreamJS](http://streamjs.org/)), these constructs only return values on-demand. Collections of infinite length are actually workable without enormous processing power or infinite system memory.

```javascript
// native Javascript array (not lazy)
var jsArray = [1,2,3,4,5,6,7,8,9];

jsArray.length;  // returns 9
```

Lazy evaluated structures will work quite a bit differently.

```javascript
// using Stream.js library
var simple = Stream.range(); // create a stream of natural numbers [1,2,3...&infin;]

simple.length(); // returns... umm, infinitely loops as it attempts to find the end

simple.take(10).length(); // returns 10
```

Checkout Stream and do some cool things. I would love to see it!

---

#### Continuations

Continuations are not possible in Javascript. [http://idea-log.blogspot.com/](http://idea-log.blogspot.com/2005/10/why-are-continuations-so-confusing-and.html)

Think of the old "goto" statements of yore but add in the fact that state of computation/execution is kept.

  > "[a reification of] an instance of a computational process at a given point in the process's execution" ~~ [http://eriwen.com/](http://eriwen.com/javascript/cps-tail-call-elimination/)

Javascript does not support Continuations natively; however, the Rhino environment does provide them as first-class objects.

  * Resume execution with pre-existing state

---

#### Continuation-Passing Style (CPS)

Commonly used as callbacks in Javascript land.

```javascript
doAJAX(
    'http://url.to.api'
  , JSON.stringify({name: 'Joshua'})
  , function succesHandler (data) {/*do cool stuff*/}
  , function failHandler  (error) {/*do cool stuff*/});
```

Possible stack overflow problems for deeply nested calls due to no tail optimization.

  > "No procedure is allowed to return to its caller ever..." ~~ [By example: Continuation-passing style in JavaScript](http://matt.might.net/articles/by-example-continuation-passing-style/)

---

#### Functional Elsewhere?

We can gain some of the benefits that Functional offers us by just working in that way.

  > "Programming in a functional style can also be accomplished in languages that aren't specifically designed for functional programming." ~~ [wikipedia](http://en.wikipedia.org/wiki/Functional_programming)

  * Avoid reliance on state transformations
  * Write functions side affect free
  * Prefer composition over inheritance

---

## Example Time!

---

## #FunctionalJS

### Go, now, and be functional

---

#### Further Learning

  * Point Free
  * Monads

---

#### Resources

  1. [Functional Programming - Wikipedia](http://en.wikipedia.org/wiki/Functional_programming)
  2. [Functional Programming For The Rest of Us](http://www.defmacro.org/ramblings/fp.html)
  3. [Pure, functional JavaScript](http://cjohansen.no/talks/2012/sdc-functional/#1)
  4. [Stream.js](http://streamjs.org/)
  5. [Functional Programming - igstan.ro](http://igstan.ro/files/functional-programming.pdf)
  6. [Function Declarations vs. Function Expressions](http://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)
  7. [By example: Continuation-passing style in JavaScript](http://matt.might.net/articles/by-example-continuation-passing-style/)
  8. [Continuation-Passing Style](http://marijnhaverbeke.nl/cps/)
  9. [lz](https://github.com/goatslacker/lz)
  10. [http://idea-log.blogspot.com/](http://idea-log.blogspot.com/2005/10/why-are-continuations-so-confusing-and.html)
  11. [Overview of the four main programming paradigms](http://people.cs.aau.dk/~normark/prog3-03/html/notes/paradigms_themes-paradigm-overview-section.html)

---

## Joshua T Kalis

### August 2012
