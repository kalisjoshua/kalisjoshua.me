## JSConf 2014
### Space-launch

---

## Firstly.
### JavaScript is Awesome!

---

## And, if you don't think so...

---

## Get out.

Not really, but seriously, it is.

---

### Day 1 Sessions

  1. Armchair Type Theory
  2. Emotional Safety
  3. Battle-tested Enterprise NodeJS
  4. Frontend Ops Tooling
  5. UI Algorithms
  6. Frontend Performance Testing
  7. RaveJS
  8. Regenerator
  9. Why does ReactJS Scale?

---

## 1. Armchair Type Theory

For your sanity's sake.

---

### Type *System* not *Theory*

  > **Type Theory** - "... any of a class of formal systems, some of which can seve as alternatives to set theory as a foundation for all mathematics, every 'term' has a 'type' and operations are restricted to terms of a certain type." ~ [wikipedia](http://en.wikipedia.org/wiki/Type_theory)

  > **Type System** - "... a type system is a collection of rules that assign a property called a type to the various constructs — such as variables, expressions, functions or modules — a computer program is composed of." ~ [wikipedia](http://en.wikipedia.org/wiki/Type_system)

---

### Types Can Save Your Ass

  * Goto Fail
  * Heartbleed

Strict-typing can narrow the scope of what is a valid program by removing from the developer the need to, explicitly, check for object types in code.

---

### JavaScript Types

JavaScript has types:

  * Function
  * Number
  * Object
  * String
  * others

Support for creating and using custom types is not very intuitive or developer-friendly.

---

### (Lack of a) Type System

````javascript
function areaOfACircle(shape) {

  return Math.PI * shape.radius * shape.radius;
}

areaOfACircle(9); // runtime error
````

---

### Type System Applied

````javascript
class Circle {
  constructor (radius) {
    public radius = radius;
  }
}

function areaOfACircle(shape : Circle) {

  return Math.PI * shape.radius * shape.radius;
}

areaOfACircle(9); // compile error
````

---

## But, wait...
### That's not JavaScript

---

### Compile-to-JS Languages

  * TypeScript (.NET)
  * PureScript (Haskell)
  * Elm (Haskell, OCaml, F#)
  * Roy (Haskell)
  * ClojureScript (Clojure)
  * and on, and on, and... on...

*[100s in total ~ GitHub](https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS)*

---

### One Last Type System Plug

  > "[Without a Type System] the only way to know your program is correct is to run the program." ~ speaker

---

## Emotional Safety

### Be excellent to one another.

---

### Emotional Safety

  * When people feel "safe" they will produce their best work
  * When people feel anything but "safe" their work suffers
    + Bad decisions
    + Loss of forethought
    + Communication breaks down
    + Reason is tough to accept
  * Happy smart people are always going to produce better results

---

### Emotional Safety

Help to make the people around you feel "safer".

  * Be inclusive rather than exclusive
    + Avoid bad 'isms': Sexism, Racism, Elitism, Codism
  * Think about how others will receive your actions and words
  * Resolve conflicts quickly and in a constructive manner

---

## Battle-tested NodeJS in the Enterprise

### JavaScript everywhere and it's totally cool

---

### Battle-tested

  > "[FidSafe is] architected in such a way that the entire system would need to be compromised in order to gain any useful information." ~ speaker

---

## Frontend Ops Tooling

### Automate all of the things!

---

### Frontend Ops Tooling

  * Reduce human error
  * Automation === Productivity
  * Respond faster to:
    + New features
    + Bug reports
    * Security fixes

---

### Frontend Ops Tooling

There are lots of tools. Some favorites are:

  * Grunt (good)
  * Gulp (better)
  * npm + scripts (good)

---

### Frontend Ops Tooling

#### npm + scripts

package.json

````json
{
  ...
  "scripts": {
    "awesomeize": "./path/to/awesome.ize.js",
    "simple": "./path/to/simple.sh"
  }
  ...
}
````

---

### Frontend Ops Tooling

  1. When starting a greenfield project, automate as much as possible to begin with
  2. Whenever possible automate anything repetitive in any project as soon as possible

The developers' job/sanity/time you save might just be your own.

---

## UI Algorithms

### This was awesome!

---

### UI Algorithms

The problem you are working on right now, was probably solved at least 20 years ago.

---

### UI Algorithms

Shamelessly thieve (borrow) [slides from the original](https://github.com/markmarkoh/jsconf2014) presenter (Mark DiMarco).

---

### UI Algorithms

I'm not going to talk too much about this because you should watch the actual talk when it is available.

---

## Frontend Performance Testing

### You. Want. RUM.

---

### Frontend Perf Testing

**RUM** - Real User Metrics/Monitoring.*

You want RUM because:

  * "Fully loaded" !== "App ready"

\* *One provider of this is New Relic*

---

### Frontend Perf Testing

Be sure that you consider unique factors of your application:

````
     Application state
               Plugins
    +        User type
    ------------------
    Unique and hard to track-down bug
````

---

### Frontend Perf Testing

For logging/tracking in the browser there are APIs available.

  * High-resolution time
    + window.performance

Comcast has opensourced Serf-n-Perf library.

---

### Frontend Perf Testing

Track/graph 99% of traffic by default.

Paying attention to only averages will not give you as much information as the extremes are effectively nullified.

You want to see the extremes so that they can be addressed.

---

## Composing Frontend Components
### MontageJS

---

### Composing the Frontend

  * Create a publish small specialized and composable frontend component on npm
  * Use a framework that enables composing of frontend components

---

## Hey, we happen to be building such a framework

### Sales pitch.

---

## RaveJS

This looks like Yeoman a little, but feels a little more like a seed project with a plugin architecture development style.

That is all I have.

---

## Regenerator

I have no idea where this talk came from or what talk it supplanted in the schedule.

---

### Some Notes

When you want people to join in and work on your opensource project:
  + Tell people what features are needed by opening issues
  + Describe the vision for the project
  + Define high and low level features that are needed

New contributors need something they can accomplish to feel like that can help.

---

## Why Does React(JS) Scale?

Minimize time-to-change

---

### React(JS) Focus

  * Minimize the time to find root causes of bugs
  * Reduce the footprint of the application where bugs can occur
  * Identify errors when they first occur
    + The stack-trace of where an error occured is typically wrong with JavaScript

---

## Package Management For ES6 Modules

### jspm.io

---

### jspm.io

  * Explore the idea of package management
  * Goals are to be single-line:
    + Install
    + Require
  * Working towards future standards

---

### Using

  * For now use a poly-fill - system.js
  * Strictly follow [Semver](http://semver.org/)
    + Include in header request
    + Very important for HTTP/2
  * Web components are going to be awesome!

---

## Optimize 2D & 3D Canvas Rendering

---

### Optimize vs. Best Practice

  > "Premature optimization is the root of all evil." ~ somebody smart

---

### Premature Optimization

While this does hold true...

  * Best practices can be applied throughout development
  * Optimizations should be applied during refactor and cleanup

---

### Optimize vs. Best Practice

  > "Premature optimization is the root of all evil; when done at the wrong time." ~ me

---

### Best Practices

  * Frequent access of data in LocalStorage can become a performance bottle-neck.
    + Batch reads/writes
    + Respect the intention - LocalStorage is not a message bus
  * Use object pools
  * When drawing shapes use int over float

---

### Micro-optimizations

 * Bitwise
 * if/else/else if over switch (or even better objects as a hash-map)
 * When emptying arrays, use `.length = 0`

---

## Make It Pop

---

### Make It Pop

Unfortunately I missed most of this talk but I caught the tail end and these links were shared:

  * http://hackdesign.org
  * http://goodui.org

---

## Encouraging Diversity In Your Open Source Project

### Diversity === Good

---

### Encouraging Diversity

  > "Diversity trumps ability." ~ [Page Scott](http://www.forbes.com/sites/stevedenning/2012/01/16/why-is-diversity-vital-for-innovation/)

---

### Encouraging Diversity

  * Cognitive diversity
  * People without domain knowledge - sometimes - will have better solutions
  * Disjunctive tasks benefit from collaboration
  * Contributor does not necessarily mean code

---

### Encouraging Diversity

  * Establish a code of conduct for contributing to a project
  * Open issues for project goals, milestones, tasks, todos, and desires
  * Common project blind-spots:
    + Accessibility (a11y)
    + Internationalization (i18n)
    + Documentation
  * Encourage contributors to teach you what you don't know
    + There is a wealth of information that you do not have

---

### Recognize

  > "You don't know everything; you will benefit from getting others' opinion." ~ me

---

### Remember

  > "Making good software is really fucking hard." ~ Kate Hudson (presenter)

---

## Persistent Data Structures

I only caught the very end of this session, but...

---

### Persistent Data Structures

  1. Clojure has some pretty cool stuff in it
  2. I want to use them on the web
  3. But I don't want to use ClojureScript

---

## [Mori](https://github.com/swannodette/mori)

### EOL

---

## Distributed Complex Computing With NodeJS

---

### NodeJS Distributed Computing

Exhibiting ZeroMQ distributing Fourism tasks to peer-computers.

---

## Learning ES6 As A Community

---

### Learning ES6

  * The standards committee is trying to "pave the cowpaths"
  * FYI - we are the cows in this analogy
  * So, start walking around

---

## NodeJS Deploment

---

### NodeJS Deployment Rules

  1. No config
  2. Work locally as close to production environment
  3. Don't use Git for deployment

---

## Web Components Accessiblity

  > "[accessibility] is the right thing to do." ~ speaker

---

### Web Components Accessibility

The first rule of Web Components:

  1. Make sure that you need a web component; be sure what you actually need isn't already a standard element.

---

### Web Components Accessibility

Web Components are a chance to extend the DOM, when you do, don't forget about:

  * Semantics
  * Accessibility

---

### A11y

  1. ARIA roles are cool
    + They help impaired users (do the things you take for granted)
  2. `display: none;` - removes the element from the a11y tree

---

## With great power...

---

## Reactive Game Development

Just watching someone code a simple game.

---

### Recative Programming

  * Functional Reactive Programming (FRP)
    + An example of a good use case for FRP is something like a spreadsheet
  * Reactive Extensions - M$ technology for handling async data streams
  * RxJS - Open-source port of M$ technology mentioned above

---

## Modules For Browser And npm

---

### Modules

  1. Use CommonJS syntax
  2. Use Browserify to make modules available in the browser
    + Browserify will shim modules if necessary

---

## Open Web Art

The web is a new medium for art.

---

### Open Web Art

  * Art can be collaborative and community-building
  * Contributing can break down barriers between people

---

## Demo

http://cell-flight.com

---

## Being Human

### A truly inspirational talk; including some personal experiences of the presenter.

---

### Rule #1

The most important rule we should adhere to is:

  1. Be excellent to one another.

---

### Be Passionate

Share your passion, inspire others.

You will find, people are passionate about things too.

---

### Have Compassion

  * Everyone is worthy of respect
  * Kindness matters
  * Small actions can have huge impact

---

### Opportunities

  * If you are struggly, talk to someone about it; don't wait till someone notices
  * Reach out to people, make them feel good; they might be waiting for you to do so

---

### Do These Things

... and you will:
  * Convert "lurkers" into "contributors"
  * Have people joining in conversations
  * Receive code contributions
  * Change lives

---

### Suggestion

If you liked any of what I have mentioned, I highly suggest looking this talk up and watching it yourself. I have not done it justice.

---

## Thank you
