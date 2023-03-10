## What Is `this`?

---

## Let's talk about `this`.

---

## Warning, there might be a few bad puns.

Hopefully, `this` will not be too much of a problem.

---

### Terminology

**Context**

With regard to JavaScript, the 'context' of a function is the value of the `this` keyword within a function body.

**Function vs. Method\***

A *function* is something created in a scope that is not attached to an object, whereas a *method* is a function that is a member of an object.

\* *This is my terminology for the purposes of this talk and when I am trying to speak about the difference between the two concepts. It is my attempt to be more clear about what I am talking about.*

---

### The Goal

#### Understand function context in JavaScript

You should be able to, with good confidence, reason about what the value of the `this` keyword is going to be, in a function during its' execution.

---

### First Rule Of Thumb

The context of function execution is the object that called the function; if no scope is explicitly set, assume 'global'.

---

### Simple Global Scope Execution

````javascript
function testScope() {
  console.log(this);
}

// the context of this function
// execution is the global object
testScope();
````

---

### Object Methods

````javascript
var myObj = {
  method: function () {
    console.log(this);
  }
};

// the context of this method
// execution is the `myObj` object
myObj.method();
````

---

### With 'Classes'

````javascript
function OurObject() {
  this.method = function () {
    console.log(this);
  };
}

// using 'new' below changes the context
// the function executes in so that it
// can be use for object creation
var myObj = new OurObject();

// the context of this method
// execution is an empty object
myObj.method();
````

---

### Now, With Prototypes

````javascript
function OurObject() {}

OurObject.prototype.method = function () {
  console.log(this);
};

// using 'new' below changes the context
// the function executes in so that it
// can be use for object creation
var myObj = new OurObject();

// the context of this method
// execution is an empty object
myObj.method();
````

---

## That's Great

### But what about modifying context after function definition?

---

### Business Requirement

Create a function that can accept any number of arguments and will return true if the number 9 was passed in and false otherwise.

````javascript
includesNumber9();        // false
includesNumber9(1);       // false
includesNumber9(2, 3);    // false
includesNumber9(9);       // true
includesNumber9(7, 8, 9); // true
includesNumber9(19);      // false
````

---

### Iterating Arguments

````javascript
function includesNumber9() {
  var counter = 0,
      length = arguments.length
      found = false;

  while (!found && counter < length) {
    if (arguments[counter] === 9) {
      found = true;
    }

    counter += 1;
  }

  return found;
}

console.log(includesNumber9(1, 2, 3, 4, 9));
````

---

## Is there a better way?

### Possibly with less code.

---

### Using Array's `indexOf`

Noticing that the arguments object is very similar to an array we could make the computer do our work for us.

````javascript
function includesNumber9() {

  // 'TypeError: undefined is not a function'
  // the 'arguments' object is not an array; it's
  // an object and doesn't have an indexOf method
  return -1 !== arguments.indexOf(9);
}

console.log(includesNumber9(1, 2, 3, 4, 9));
````

---

## Function Methods

### Change function execution context

---

## Bend JavaScript to your will

---

### The ABCs of Context Manipulation

`Function.prototype` methods allow you to take control - to some extent - what context an function/method executes with.

  - `apply`
  - `bind`
  - `call`

---

### `Function.prototype.apply`

  > "The apply() method calls a function with a given this value and arguments provided as an array (or an array-like object)." ~ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

```javascript
function testFn() {
  console.log(this);
}

testFn();               // logs global object
testFn.apply(9);        // logs Number object
testFn.apply('Hello');  // logs String object
```

*For now, we will ignore the additional argument that `apply` accpets.*

---

### `Function.prototype.call`

  > "The call() method calls a function with a given this value and arguments provided individually." ~ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

```javascript
function testFn() {
  console.log(this);
}

testFn();               // logs global object
testFn.call(9);         // logs Number object
testFn.call('Hello');   // logs String object
```

*For now, we will ignore the additional arguments that `call` accpets.*

---

## Over-simplification

Ignoring argument(s) after the first, `apply` and `call` are identical.

They invoke a function/method.

---

### `Function.prototype.bind`

  > "The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called." ~ [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)


```javascript
function testFn() {
  console.log(this);
}

var bound9 = testFn.bind(9);
var boundHello = testFn.bind('Hello');

testFn();             // global object
bound9(9);            // Number object
boundHello('Hello');  // String object
```

*For now, we will ignore the additional arguments that `bind` accpets.*

---

## When would any of these be needed?

---

### Array Methods On `arguments`

````javascript
function includesNumber9() {
  var args;

  args = Array.prototype
    .slice
    .call(arguments, 0);

  return -1 !== args.indexOf(9);
}

console.log(includesNumber9(8, 9)); // true
console.log(includesNumber9(4, 5)); // false
````

---

### Array Methods On `arguments` (continued)

````javascript
function includesNumber9() {

  return -1 !== [].indexOf.call(arguments, 9);
}

console.log(includesNumber9(8, 9)); // true
console.log(includesNumber9(4, 5)); // false
````

  - Compare with [Iterating Arguments](#iterating-arguments)
  - Performance concerns

---

### Gauranteed Context

```javascript
var customObj,
    url = 'awesome/url';

customObj = {
  statement: 'Yay!'
};

function callback() {
  console.log(this.statement);
}

mythicalAjax(url, callback); // undefined
mythicalAjax(url, callback.bind(customObj)); // 'Yay!';
```

  - [Imagine] `callback` does not have scope access to `customObj`
  - But the call-location of mythicalAjax has scope access to both


---

### Once Bound

Be careful however. Once a function has context bound using bind that context is forever.

```javascript
var bound;

function Foo() {
  console.log(this);
}

bound = Foo.bind('Bar');

bound.call('Foo'); // 'Bar'
```

---

## Was `this` Good/Helpful?

---

## Any Questions About `this`?
