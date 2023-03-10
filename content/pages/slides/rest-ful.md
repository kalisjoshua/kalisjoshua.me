## REST

Relax. You can do it.

---

## The REST You Know

---

... is (probably) wrong.

---

![Gasp](http://fc00.deviantart.net/fs70/i/2012/042/f/a/gasp_base_by_yumi_and_zb-d4pfzjl.png)

---

## But That's OK.

We're all in the same boat, so you're not alone.

---

## Ready to get better?

[Audience participation]

---

## I wont do that again.

Promise.

---

## What is REST and why do I care?

---

### Agenda

Here's what we are gonna cover.

  - What is REST
    + Definition
    + Clarification
  - Examples
    + A simple object collection
    + Less-obvious event modeling
  - Why does anyone care?

---

### What REST is not?

  - Mapping DB tables to URIs
  - URIs without file extensions
    + /index vs. /index.html
  - SEO-friendly URIs
    + /user-settings
    + /User/Settings
  - Task-based URIs responding only to POST
    + /SaveUserData
    + /GetUserData
    + /UpdateUserData
    + /DeleteUserData
  - Much more...

---

### What is REST?

  - An architectural style - a set of architectural constraints
  - **REST** - REpresentational State Transfer
  - REST is not HTTP, but HTTP does exhibit REST


  > "The World Wide Web represents the largest implementation of a system conforming to the REST architectural style." ~ [wikipedia](http://en.wikipedia.org/wiki/REST)

---

### Architectural Constraints

  1. Client-Server
  2. Stateless
  3. Cache (cacheable)
  4. Uniform Interface
    + Resources
    + Representations
    + Messages
    + Hypermedia
  5. Layered System
  6. Code On-demand [optional]

---

## Congratulations

Do these things and you are RESTful.

*Missing any of them, however, means you are not.*

---

## UnRESTful

Which is totally fine; just don't call it REST.

---

## Resources + Representations

### ... will guide you towards REST

*My personal belief.*

---

### Maturity Model

The Richardson Maturity Model describes the three steps towards the glory of REST.

````
RESTful enlightenment
(Level 3) Hypermedia Controls
(Level 2) HTTP Verbs & Status Codes
(Level 1) Resources
The swamp of POX - Plain 'ole XML
````

---

### Some Basics - URLs

````
<scheme>://<host>:<port>/<path>?<search>#<fragment>
````

#### Breakdown

URL piece | value
--------- | -----
scheme    | http or [https, ftp, etc.]
port      | 80 (80 is default; assumed if nothing is provided)
host      | example.com
path      | /path-to/resource
search    | ?filter=active
fragment  | #anchor - references an [id, name] in the page

---

### URIs

````
<scheme>://<host>:<port>/<path>?<search>#<fragment>
````

  - The `path` should identify a resource
    + A collection of objects
    + A single object with a unique identity
  - The `search` should filter or refine what is addressed by the `path`
    + Filtering a list of object based on a criteria
    + Returning only a subset of properties on a resource

RESTful HTTP APIs will be concerned with the `path` and `search` portions of the URI.

---

### HTTP Verbs

  - **Idempotent** - repeating a request will not continually change the system
  - **Side-effects** - changes will occur as a result of the request

Verb    | Action | Idempotent | Side-effects
------- | ------ | ---------- | ------------
POST    | Create | no         | yes
GET     | Read   | yes        | no
PUT     | Update | yes        | yes
DELETE  | Delete | yes        | yes
OPTION* |||
HEAD*   |||
PATCH*  |||

\* *Left as an exercise for the brave and over-achieving.*

---

## Example Time

---

### BAD Examples

  1. `/v3/json/GetUser/1234` or `/v3/GetUser/1234.json`
    + Don't put the media type in the URI; put it in the request (accept) headers
    + Don't add verbs to the resource; use the proper HTTP verb
    + Pluralize the resource since it is a collection; 'Users' not 'User'
  2. `/MyCollectionOfThings/789/InstanceOfObject/432/NameOfGrouping/Property`
    + Don't filter properties in the URI; use a query to filter
    + Don't nest the URIs to match the data modeling; move resources closest to root as possible

*The APIs that offer these endpoints are not RESTful.*

---

## You Want To Design A Good API?

---

## You Want To Design A Good API.

---

### Do These Things First

  1. Evaluate business process*
  2. Identify objects (Resources) that need be represented in the API
  3. Define Verbs for each Resource

\* *We are not going to cover this here.*

---

### Plan

A sample API plan for some pets.

Resource   | POST   | GET    | PUT    | DELETE
---------- | ------ | ------ | ------ | ------
/cats      | Create a new cat resource | Retrieve a list of all Cats | Update the list of all Cats | Empty the list of all Cats
/cats/{id} | error | Retrieve Cat information | Update info about a specific Cat | Remove the Cat from the list of all Cats
/dogs      | Create a new dog resource | Retrieve a list of all Dogs | Update the list of all Dogs | Empty the list of all Dogs
/dogs/{id} | error | Retrieve Dog information | Update info about a specific Dog | Remove the Dog from the list of all Dogs
/pets      | error | Retrieve a list of all Pets | error | Empty the list of all Pets
/pets/{id} | error | Retrieve Pet information| error | Remove the Pet from the list of all Pets

---

### Best Practices

  - Use pluralized Resource endpoints
    + Dogs
    + Cats
    + Persons or People?
  - Use singular-ized nouns for namespaces
  - Model Resources as close to root of the API as:
    + Possible
    + Makes sense for the domain
  - Be **consistent** across all Resources

---

## Why Does Anyone Care?

---

### Library (Helper) - [AngularJS](https://docs.angularjs.org/api/ngResource/service/$resource)

````javascript
angular.module('app')
  .service('API', function ($resource) {

    return {
        Dogs: $resoure('/dogs')
      };
  });

angular.module('app')
  .controller('MainCtrl', function (API) {
    API.Dogs
      .get(function (data) {
        // Do something with data
      });

    API.Dogs
      .save({
        // New Dog representation saved to collection
      });
  });
````

---

### Library - [Fermata](https://github.com/natevw/fermata)

````javascript
var api = fermata.json('http://example.com'),
    Dogs = api.dogs;

Dogs.get(function (err, data) {
  // data is a JavaScript object
});

Dogs.post({/* data */}, function (err, result) {
  // report success or failure
});
````

---

### Good Reasons

  - Be part of a community
  - Help others; outside your immediate team
    + Learn from people using your API
  - Get help from others; outside your immediate team
  - Benefit from the mistakes of other people; stand on the shoulders of giants

---

### Better Reasons

  - Performance
  - Scalability
  - Simplicity
  - Modifiability
  - Visibility
  - Portability
  - Reliability

All of the above are achievable with REST if employed correctly and consistently.

---

## And the best reason...

---

## Look like a genius

---

### Thank You

#### Joshua T Kalis

  - http://twitter.com/kalisjoshua
  - http://github.com/kalisjoshua

---

#### Resources

  - http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm
  - http://en.wikipedia.org/wiki/Representational_state_transfer
  - http://blog.steveklabnik.com/posts/2011-07-03-nobody-understands-rest-or-http
  - http://nicksda.apotomo.de/2010/10/rails-misapprehensions-crud-is-not-rest
  - http://kellabyte.com/2011/09/04/clarifying-rest/
