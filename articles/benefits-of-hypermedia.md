The Benefits of Hypermedia
==========================

Hypermedia can benefit: any API, the developers of an API, the developers of
the consumers of an API, the business providing and API, and the business
consuming an API; if only the barriers to adoption/entry can be overcome. The
barriers being:

  1. Choosing, and committing to, a format that suits the API domain
  2. Matching the choice of format with the expectations of clients
  3. Clients embracing the spirit of hypermedia-driven applications

Developers - on both sides: producers and consumers - are intimidated by
hypermedia as a concept and the choices it presents; so much so that often a
decision to ignore it alltogether is made. Choosing to provide and consume
hypermedia may be expensive but the benefits are many and wide-reaching. These
benefits include:

  - Explorable API ([soabits])
  - Inline Documentation ([soabits])
  - Simple Client Logic ([soabits])
  - Server-owned URLs ([soabits])
  - Content Offloading ([soabits])
  - Versioning With Links ([soabits])
  - Multiple Implementations ([soabits])
  - Isolation Of Changes
  - Explicit Workflow

### Isolation of Changes

Isolation of changes refers to a concept also known as "decoupling". This
isolation helps keep changes to as few layers, of an application, as
possible; ideally one. Isolation also reduces the need for coordination
between layers about changes happening. Where changes need to be made, and
subsequently where errors need to be tracked down, is of great importance to
teams managing applications.

**An overly simplified example:**

  > A client application exists which displays a list of links to users; which
  links to display are decided by the authorization rights of a given user. The
  user's access rights will likely change over time, and across many users will
  happen frequently. The solution using a Hypermedia API would be to provide
  the list of links in API responses and simply display thos links in the
  application; this keeps a single point of authority in the API.

### Explicit Workflow

Explicit workflow allows the API to control the path through a set of steps
allowing that path to change and evolve over time. Consuming applications need
only know how to "follow the path".

**An overly simplified example:**

  > A client application is developed to follow links, in API responses, to
  establish a "flow" in the application; the flow being "A -> B -> C -> Z". A
  business decision is made that changes the flow to "A -> C -> B -> D -> Z".
  The necessary change is then made only in the API layer of the system and the
  client application remains unchanged.

[soabits]: http://soabits.blogspot.no/2013/12/selling-benefits-of-hypermedia.html

