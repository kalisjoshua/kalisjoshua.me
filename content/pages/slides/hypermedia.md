## What is Hypermedia?

---

### That's a good question...

Isn't it usually the case that when this statement is uttered, the person who delivered it doesn't have an answer?

---

## What is Hypermedia?

... as it pertains to HTTP APIs.

---

### Hypermedia

  > Hypermedia is defined by the presence of application control information
  embedded within, or as a layer above, the presentation of information. ~
  [Fielding](http://www.ics.uci.edu/~fielding/pubs/dissertation/web_arch_domain.htm)

... ok ...

  > Hypermedia is a very general idea of documents or resources linked together
  ~ Matt Nagi (HipChat conversation)

---

![Forest Gump](https://i.imgur.com/9ciVveR.jpg)

---

## Hypermedia means... links.

<!--
notes:
    + at the very least, Hypermedia include links
    + information coded into the API responses is not necessarily coded into the
    consuming application or developer's head
-->

---

![Ziggy, gone too far.](https://i.imgur.com/KZExFmV.gif)

<!--
image:
  http://sd.keepcalm-o-matic.co.uk/i/this-shit-has-gone-too-far.png
-->

---

## Hypermedia = data + metadata

A resource representation, including links (URLs) to additional actions
(affordances) and optionally related resources.

---

### Metadata / Links

Codify knowledge into the API so that developers can use it. Let developers be
lazy and not know all of your API to use a small part of it.

#### Some Rules

  1. **URL construction** should not be *knowledge* that must be shared between
  producer and consumer; *knowing* about URLs is better left to the producer only.
  2. A resource representation should **link to affordances**.
    - How to interact with the affordances should be documented.
  3. **Documentation** of a resource should be linked within a resource response
  to help developers learn more about the current resource; if and when needed.

---

![Morpheus, show me.](https://i.imgur.com/EWKxiVE.jpg)

---

![Read the fine print.](https://i.imgur.com/TpiHUA8.jpg)

---

### Disclaimer

These examples will ignore Hypermedia specifications to start out. These examples
are only to illustrate concepts not suggest a data format to be used.

---

### URL Construction

#### Plain Resource API Response

```
{
  "Name": "Snoopy",
  "Movies": [
    {
      "Id": 298750,
      "Title": "Happiness is a Warm Blanket, Charlie Brown"
    },

    {
      "Id": 298751,
      "Title": "He's a Bully, Charlie Brown"
    }
  ]
}
```

#### Hypermedia-ized API Response

```
{
  "Name": "Snoopy",
  "URL": "/characters/snoopy",
  "Movies": [
    {
      "Title": "Happiness is a Warm Blanket, Charlie Brown",
      "URL": "/movies/298750"
    },

    {
      "Title": "He's a Bully, Charlie Brown",
      "URL": "/movies/298751"
    }
  ]
}
```

---

### URL Construction (cont.)

If you provide a link to another resource, within a resource representation, and
don't require the API consumer to *know* what is available ahead of time, the
consumer and provider will be less coupled together.

*HINT: less coupling is a good thing in this case.*

Every time your API changes, in a breaking way, that gives consumers reason to
evaluate options that do not include using your service.

---

### Link to Affordances

#### Plain Resource API Response

```
{
  "Name": "Snoopy"
}
```

#### Hypermedia-ized API Response

```
{
  "Name": "Snoopy",
  "Affordances": [
    {
      "Afford": "Get a list of movies for this character.",
      "Method": "GET",
      "URL": "/movies?character=snoopy"
    },

    {
      "Afford": "Update information about this character.",
      "Method": "PUT",
      "URL": "/character/snoopy"
    }
  ]
}
```

---

### Documentation

#### Plain Resource API Response

```
{
  "Name": "Snoopy"
}
```

#### Hypermedia-ized API Response

```
{
  "Name": "Snoopy",
  "Documentation": "/docs.other.domain/characters"
}
```

---

### Hypermedia Standards (media-types)

  + Atom/AtomPub
  + [Collection+JSON](http://amundsen.com/media-types/collection/)
  + (X)HTML
  + [HAL](http://stateless.co/hal_specification.html)
  + [JSONLD](http://json-ld.org/)
    + [HYDRA](http://www.markus-lanthaler.com/hydra/)
  + [MASON](https://github.com/JornWildt/Mason)
  + [Siren](https://github.com/kevinswiber/siren)
  + Custom?

*Custom? Yes, you may find that the standards that have been defined may not fit
your use case and you may choose to define your own. If you do, you should write
a specification for it and your team and consumers should know about it.*

---

## Hypermedia Clients

One goal of Hypermedia is to be consumed by software, known as Hypermedia API
Clients.

---

## Forthcoming Presentation?

### What Is A Hypermedia Client?

---

### Thank You

---

### Resources

  + http://apievangelist.com/2014/01/07/what-is-a-hypermedia-api/
  + http://www.ics.uci.edu/~fielding/pubs/dissertation/web_arch_domain.htm
  + http://mamund.site44.com/talks/2014-07-apicraft-art/
