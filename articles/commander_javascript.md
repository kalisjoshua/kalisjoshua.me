Title: Commander JavaScript
Date: 9 Oct 2013
Tags: JavaScript, Design Patterns

A simple introduction to the Command Pattern and some reasons why it might be a great pattern to use in JavaScript.

## Preface

I have been wanting to gain some more Computer Science knowledge so I started reading more about Design Patterns. I have known about them for a long time and generally speaking my primary understanding ended at the Singleton pattern. I knew that there were other patterns defined but had no use for them since I didn't know them or how to use them.

Recently I have been building libraries of code more and have found that I like the Command Pattern a lot. Especially in JavaScript where some other language features are missing - or available depending on your point of view - which create problems for securing functionality from tampering.

## Use Case

You are a developer wanting to create a new library for a particular purpose. You know that you are not going to necessarily think of everything, needed for other developers to use up front, so you want to also provide a way for them to add in features as they need to. You want to do this but don't want to allow them to harm the functionality of what you provide; at least not without them knowing that they are explicitly changing some core functionality.

Let's use the old chestnut, the shopping cart. Some required features are:

  1. Add items to the cart
  2. Return a list of items in the cart
  3. Retrieve the total
  4. Remove an item from the cart by index

I think that is enough to get started; not a fully feature complete shopping cart but enough to get some points across.

## The Truly Naive Approach

The simplest way to implement this cart - in pure JavaScript - is with no encapsulation or security around it. This is something that will work perfectly if you are sure that no one will ever open a console on your shopping site and meddle with the code.

    var cart = []; // an empty cart

    function addItem (item) {
      cart.push(item);
    }

    function getItems () {
      return cart;
    }

    function getTotal () {
      return cart
        .reduce(function (sum, item) {
          return sum + item.price;
        }, 0);
    }

    function removeItem (indx) {
      cart = cart
        .slice(0, indx)
        .concat(cart.slice(indx + 1));
    }

To use this cart API here are some sample function calls:

    addItem({name: 'Radio Flyer Wagon', price: 19.95});
    getItems(); // returns [{name: 'Radio Flyer Wagon', price: 19.95}]
    getTotal(); // returns 19.95
    removeItem(0); // cart emptied

Here, the requirements have been met with the functions defined. However, I hope that no one would feel comfortable putting this code into a production environment when these are globally accessible; that is if the organization likes to be accurate when it comes to their sales.

## Clean Up The Global Scope

There are a whole lot of problems in the code above and the first step towards mitigation would probably be to reduce the impact on global scope; everything is itself in the global scope. One of the early lessons in JavaScript is to not do exactly what has been done above; the suggestion is to create a namespace and include everything in one - or as few - as possible to not clutter the global scope. Let's do that now.

    var cart = {
      items: [], // an empty cart

      addItem: function (item) {
        cart.items.push(item);
      },

      getItems: function () {
        return cart.items;
      },

      getTotal: function () {
        return cart.items
          .reduce(function (sum, item) {
            return sum + item.price;
          }, 0);
      },

      removeItem: function (indx) {
        cart.items = cart.items
          .slice(0, indx)
          .concat(cart.items.slice(indx + 1));
      }
    };

To use this cart API here are some sample function calls:

    cart.addItem({name: 'Radio Flyer Wagon', price: 19.95});
    cart.getItems(); // returns [{name: 'Radio Flyer Wagon', price: 19.95}]
    cart.getTotal(); // returns 19.95
    cart.removeItem(0); // cart emptied

This is a lot *better* than the first attempt. The bigger problem still remains however; everything is still globally accessible. Keeping everything globally accessible like this does not prevent any code from changing the items array directly. There are other problems but lets address them later.

## Using Closure For Hiding

To hide access to resources in other languages we would use access modifiers like: private, static, protected, et.al. JavaScript does not provide anything like these so we have to get creative. JavaScript does provide Closure scope and that is what we can use to great benefit.

    var cart = (function () {
      var items = []; // an empty cart

      return {
        addItem: function (item) {
          items.push(item);
        },

        getItems: function () {
          return items;
        },

        getTotal: function () {
          return items
            .reduce(function (sum, item) {
              return sum + item.price;
            }, 0);
        },

        removeItem: function (indx) {
          items = items
            .slice(0, indx)
            .concat(items.slice(indx + 1));
        }
      };
    }());

To use this cart API here are some sample function calls:

    cart.addItem({name: 'Radio Flyer Wagon', price: 19.95});
    cart.getItems(); // returns [{name: 'Radio Flyer Wagon', price: 19.95}]
    cart.getTotal(); // returns 19.95
    cart.removeItem(0); // cart emptied

Now, the items array is hidden away from the global scope so that is good; no code can directly change it. That isn't entirely true because in the `getItems` method a reference to `items` is returned and therefore makes it accessible; this is fixable by returning a copy of the array instead of the array itself.

    // ...
        getItems: function () {
          return items; // don't do this
          return items.slice(0); // do this instead to return a copy
        },
    // ...

## Use The Command Pattern

But another issue is the `cart` object returned from the Closure. All of its methods are accessible; which you might think is a good thing. Callable is a good thing, changeable is not. As it stands, this code allows all of the provided methods to be overwritten in any way someone would like. It would be nice to allow the methods to be called but not changed or overwritten; until ES6 is available the Command Pattern is a good alternative.

    var cart = (function () {
      var items = []; // an empty cart

      var API = {
        addItem: function (item) {
          items.push(item);
        },

        getItems: function () {
          return items.slice(0);
        },

        getTotal: function () {
          return items
            .reduce(function (sum, item) {
              return sum + item.price;
            }, 0);
        },

        removeItem: function (indx) {
          items = items
            .slice(0, indx)
            .concat(items.slice(indx + 1));
        }
      };

      var slice = [].slice

      return function (method) {
        return API[method].call(this, slice.call(arguments, 1));
      };
    }());

To use this cart API here are some sample function calls:

    cart('addItem', {name: 'Radio Flyer Wagon', price: 19.95});
    cart('getItems'); // returns [{name: 'Radio Flyer Wagon', price: 19.95}]
    cart('getTotal'); // returns 19.95
    cart('removeItem', 0); // cart emptied

Using this pattern everything is hidden away. The only way to call a method is to call the function `cart` and pass in the method you would like to invoke, along with any arguments you would like to pass into the method.

