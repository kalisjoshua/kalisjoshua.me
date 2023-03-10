## Lambda Jam 2014

---

## Transit (format)

  > "Transit is a format and set of libraries for conveying values between applications written in different programming languages." - http://blog.cognitect.com/blog/2014/7/22/transit

---

### JSON Deficits

  * Few types
  * Repetition
  * Bloated

---

### Transit Goals

  1. Schema-less (self-describing "at the bottom")
  2. Extensible
  3. Performant
  4. Reach the browser

---

### Transit Links

  * http://blog.cognitect.com/blog/2014/7/22/transit
  * https://github.com/cognitect/transit-format

---

## Reactive Programming

Let the data flow.

---

### Reactive - Traits/Goals

  * Responsive
  * Scalable
  * Resilient
  * Event-driven

---

### Responsive + Event-driven

```
a = b + c
```

**Imperative** - Statically assign the result of the computation on the right to the identifier on the left.

When `b` or `c` change, `a` will not change.

**Reactive** - Create a relationship between the identifier on the left and the computation on the right.

When `b` or `c` change, `a` will re-evaluate.

---

### Reactive - Notes

  * Loosely coupled
  * Composable
  * Distributed(-able)
  * Failures are first-class
    * Handling errors is just another event (type)
  * Async-friendly

---

### Interactive vs. Reactive

**Interactive** - Programs respond at the speed of the interactions.

  * Will create/require backpressure in massive data streams

**Reactive** - Programs respond at the speed of the environment.

  * Backpressure will (not likely) be necessary in massive data streams with horizontal scaling

---

## Design and Architecture for Actors

System design for process-based concurrency

---

### Synonyms

Actor === Agent === Process

---

### Process-based Concurrency Mantra

  1. Processes are not threads.
  2. Processes are really cheap.
  3. Goto 1.

---

### Supervision Hierarchy Map

Imagine a soda vending machine; this might be a - over-simplified - diagram of its actors.

```
    +------------+
    |   System   |
    | Supervisor |
    +------------+
      /        \
     /          \
+---------+ +------------+
| Cooling | |  Vending   |
| System  | | Supervisor |
+---------+ +------------+
              /        \
             /          \
       +-----------+ +----------+
       | Selection | |   Soda   |
       |  Handler  | | Fetching |
       +-----------+ +----------+
```

  * From top down, coarse to fine grained responsibility.
  * One process for every *truly* concurrent activity.
  * Failure in a non-dependant process should have zero direct affect.

---

## Let it Crash

---

## "Did you try and turn it off and back on again?"

---

## No Joke

Return to a known "good" state of a system.

---

## Random Stuff

---

"... debugging ... is a powerful exercise in the learning process." - [Gerald Jay Sussman](http://groups.csail.mit.edu/mac/users/gjs/biography.html)

---

"Because, physics." - [Erik Meijer](https://twitter.com/headinthebox)
