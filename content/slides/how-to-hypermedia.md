## How to: Hypermedia

---

## Why Even Hypermedia?

Hypermedia is not a "silver bullet" and will incur some up-front cost in
development time. Some reasons to invest in a hypermedia approach are:

  1. Externalize Knowledge - loosen the coupling between provider and consumer.
  2. Change Resilience - alleviate the need to version APIs for many reasons.
  3. Centralize business logic into the API rather than split between clients
    and provider.

---

## REST Level-set

  1. Everything is a Resource
    - Every URL (endpoint) within an API - up to (excluding) the queryString -
      is a distinct Resource within the API.
  2. The **PirateNinja** Pattern - Entities and Entity Collections
    - The Entities are resources supporting - at least - *Read*, and optionally
      *Create*, *Update*, or *Delete*. They are the "things" - the nouns - that
      are generally interesting and revolve around business concepts for which
      the API exists.
    - The Collections are meta-resources that enable organization and
      management of groups Entities.
  3. Avoid Nesting
    - Nesting resources will often expose data relationships that might change
      over time and will then present the need for breaking changes to the API.
    - Deeply nested - beyond a single layer - will introduce uncertainty about
      the relationship between parent and child.

---

## Siren

The examples in this workshop will use the Siren hypermedia type:
https://github.com/kevinswiber/siren.

---

## Hypermedia Affordances

  1. Resource Properties (Siren section: `properties`)
  2. Links not Identifiers (Siren section: `links`)
  3. Extended Properties (Siren section: `entities`)
  4. Capability Descriptions / Transformations (Siren section: `actions`)

---

## Requirements

Let's design a RESTful API for cataloging Books solving for:

  - Collections
    + Authors
    + Books
    + Genres
  - Add and remove (Entities) to or from their Collections <sup>1</sup>
  - View/read individual entries of the lists

*<sup>1</sup> Specifically, when adding Books, the Author(s) and Genre(s) must
  already be added to their lists so a relationship can be established.*

---

## A Book

---

### Book - Resource Representation `application/json`

A basic, non-hypermedia, representation might look like this.

```JSON
{
  "title": "Microservice Architecture",
  "authors": [
    "Irakli Nadareishvili",
    "Ronnie Mitra",
    "Matt McLarty",
    "Michael Amundsen"
  ],
  "genre": [
    "Computer Science"
  ],
  "IBSN": "9781491956250"
}
```

---

#### The Bare Essentials

Representations like this should be viewed as the least amount of data
necessary; but much more information can be provided.

---

#### Additional Context

Some additional information that is very helpful are:

  1. Links
    - What are some related, or supporting, Resources?
    - Is there additional information about a Resource?
  2. Control
    - Do I have access to add an Entity to the Collection?
    - How would changes to an Entity be submitted?
  3. Meta
    - How many Entities are in a Collection?
    - Is this Resource composed of others?

---

### Book - Siren Entity Representation - `properties`

These are the only properties of the resource Book that aren't themselves other
resources that have a relationship with with this one. Some additional
properties that might be appropriate to a Book might be: Pages, Publish
Date, Summary, etc.

```JSON
{
  "properties": {
    "title": "Microservice Architecture",
    "IBSN": "9781491956250"
  }
}
```

---

### Book - Siren Entity Representation - `links`

The link to the Book isn't a property of the book at all; it is a feature of
the API. There are some additional links that can/should be included for
available navigation of API clients.

```JSON
{
  "links": [
    {
      "class": ["book"],
      "href": "/books/9781491956250",
      "rel": ["item", "self"]
    },
    {
      "href": "/books",
      "rel": ["collection", "parent"]
    },
    {
      "href": "/",
      "rel": ["index"]
    }
  ]
}
```

---

### Book - Siren Entity Representation - `entities`

Related resources - Authors and Genres - are included to provide the relevant
context for the Book. Additionally they provide a way to find more information
about the resources that they are through their `href`.

```JSON
{
  "entities": [
    {
      "class": ["genre"],
      "href": "/genres/1234",
      "rel": ["item", "related"],
      "properties": {
        "name": "Computer Science"
      }
    },
    {
      "class": ["author"],
      "href": "/authors/1234",
      "rel": ["item", "related"],
      "properties": {
        "name": "Irakli Nadareishvili"
      }
    },
    {
      "class": ["author"],
      "href": "/authors/2345",
      "rel": ["item", "related"],
      "properties": {
        "name": "Ronnie Mitra"
      }
    },
    {
      "class": ["author"],
      "href": "/authors/3456",
      "rel": ["item", "related"],
      "properties": {
        "name": "Matt McLarty"
      }
    },
    {
      "class": ["author"],
      "href": "/authors/4567",
      "rel": ["item", "related"],
      "properties": {
        "name": "Michael Amundsen"
      }
    }
  ]
}
```

---

### Book - Siren Entity Representation - `actions`

Resource `actions` will be associated with the client requesting the resource;
meaning, only actions that the client is allowed to perform will be returned.
Including the actions in the resource representations like this makes them
explicit and generally accessible to any client without needing to
communicating requirements from person to person.

```JSON
{
  "actions": [
    {
      "class": ["delete"],
      "name": "delete-book",
      "title": "Delete Book",
      "method": "DELETE",
      "href": "/books/9781491956250"
    },
    {
      "class": ["update"],
      "name": "update-book",
      "title": "Edit Book",
      "method": "PUT",
      "href": "/books/9781491956250",
      "type": "application/x-www-form-urlencoded",
    },
    {
      "class": ["view"],
      "name": "view-book",
      "title": "Microservice Architecture",
      "href": "/books/9781491956250",
      "fields": [
        {
          "name": "title",
          "title": "Title",
          "type": "text",
          "value": "Microservice Architecture"
        },
        {
          "name": "ISBN",
          "title": "ISBN",
          "type": "text",
          "value": "9781491956250"
        },
        {
          "name": "genres",
          "title": "Genre(s)",
          "type": "list",
          "value": [
            "/genres/1234"
          ]
        },
        {
          "name": "authors",
          "title": "Author(s)",
          "type": "list",
          "value": [
            "/authors/1234",
            "/authors/2345",
            "/authors/3456",
            "/authors/4567"
          ]
        }
      ]
    }
  ]
}
```

---

### Book - Siren Entity Representation - full

This representation is considerably more verbose than the simple,
non-hypermedia, version but it also carries with it far more useful information
than the other, enabling far more capability with less coupling between
provider and client.

```JSON
{
  "actions": [
    {
      "class": ["delete"],
      "name": "delete-book",
      "title": "Delete Book",
      "method": "DELETE",
      "href": "/books/9781491956250"
    },
    {
      "class": ["update"],
      "name": "update-book",
      "title": "Edit Book",
      "method": "PUT",
      "href": "/books/9781491956250",
      "type": "application/x-www-form-urlencoded",
    },
    {
      "class": ["view"],
      "name": "view-book",
      "title": "Microservice Architecture",
      "href": "/books/9781491956250",
      "fields": [
        {
          "name": "title",
          "title": "Title",
          "type": "text",
          "value": "Microservice Architecture"
        },
        {
          "name": "ISBN",
          "title": "ISBN",
          "type": "text",
          "value": "9781491956250"
        },
        {
          "name": "genres",
          "title": "Genre(s)",
          "type": "list",
          "value": [
            "/genres/1234"
          ]
        },
        {
          "name": "authors",
          "title": "Author(s)",
          "type": "list",
          "value": [
            "/authors/1234",
            "/authors/2345",
            "/authors/3456",
            "/authors/4567"
          ]
        }
      ]
    }
  ],
  "entities": [
    {
      "class": ["genre"],
      "href": "/genres/1234",
      "rel": ["item", "related"],
      "properties": {
        "name": "Computer Science"
      }
    },
    {
      "class": ["author"],
      "href": "/authors/1234",
      "rel": ["item", "related"],
      "properties": {
        "name": "Irakli Nadareishvili"
      }
    },
    {
      "class": ["author"],
      "href": "/authors/2345",
      "rel": ["item", "related"],
      "properties": {
        "name": "Ronnie Mitra"
      }
    },
    {
      "class": ["author"],
      "href": "/authors/3456",
      "rel": ["item", "related"],
      "properties": {
        "name": "Matt McLarty"
      }
    },
    {
      "class": ["author"],
      "href": "/authors/4567",
      "rel": ["item", "related"],
      "properties": {
        "name": "Michael Amundsen"
      }
    }
  ],
  "links": [
    {
      "class": ["book"],
      "href": "/books/9781491956250",
      "rel": ["item", "self"]
    },
    {
      "href": "/books",
      "rel": ["collection", "parent"]
    },
    {
      "href": "/",
      "rel": ["root"]
    }
  ],
  "properties": {
    "title": "Microservice Architecture",
    "IBSN": "9781491956250"
  }
}
```

---

## The Collection of Books

---

### Books - Siren Collection Representation - `properties`

The *properties* of a resource reflect the unique attributes of the
Collection and nothing outside of itself; the Entities are resources unto
themselves and therefor are not part of the `properties`. Providing data such
as: pageCount, pageSize, EntityCount, etc. helps clients gain an appropriate
level of understanding of the collection.

```JSON
{
  "properties": {
    "EntityCount": 1,
    "title": "All Books",
    "page": 1,
    "pageCount": 1,
    "pageSize": 100,
    "startOfCollection": true,
    "endOfCollection": true
  }
}
```

---

### Books - Siren Collection Representation - `links`

The `links` for a collection will often include navigational links that can be
followed for traversing long lists of resources. Again, links are provided with
URLs so the client doesn't need to know how to construct them; this makes
client logic simpler and less coupled to the API.

```JSON
{
  "links": [
    {
      "href": "/books",
      "rel": ["collection", "self"]
    },
    {
      "href": "/books?page=1",
      "rel": ["chapter", "collection", "first"]
    },
    {
      "href": "/books?page=1",
      "rel": ["chapter", "collection", "last"]
    },
    {
      "href": "/",
      "rel": ["index", "parent"]
    }
  ]
}
```

---

### Books - Siren Collection Representation - `entities`

Entity representations, when included within the Collection, are necessarily
different than when on their own because at the level of the collection less
information is necessary because if more information is needed about a resource
the link should be followed for that resource. The collection is only for
listing all comprised Entities.

```JSON
{
  "entities": [
    {
      "class": ["book"],
      "href": "/books/9781491956250",
      "title": "Microservice Architecture"
    }
  ]
}
```

---

### Books - Siren Collection Representation - `actions`

The availability of an action in a resource representation is indication that
the client has access to execute the action; there is no need to provide a
definition for an action to a client that can not perform the action.

```JSON
{
  "actions": [
    {
      "class": ["add"],
      "name": "add-book",
      "title": "Add Book",
      "method": "POST",
      "href": "/books",
      "type": "application/x-www-form-urlencoded",
      "fields": [
        {
          "name": "title",
          "title": "Title",
          "type": "text",
          "value": ""
        },
        {
          "name": "ISBN",
          "title": "ISBN",
          "type": "text",
          "value": ""
        },
        {
          "name": "genres",
          "title": "Genre(s)",
          "type": "list",
          "value": []
        },
        {
          "name": "authors",
          "title": "Author(s)",
          "type": "list",
          "value": []
        }
      ]
    }
  ]
}
```

---

### Books - Siren Collection Representation - full

```JSON
{
  "actions": [
    {
      "class": ["add"],
      "name": "add-book",
      "title": "Add Book",
      "method": "POST",
      "href": "/books",
      "type": "application/x-www-form-urlencoded",
      "fields": [
        {
          "name": "title",
          "title": "Title",
          "type": "text",
          "value": ""
        },
        {
          "name": "ISBN",
          "title": "ISBN",
          "type": "text",
          "value": ""
        },
        {
          "name": "genres",
          "title": "Genre(s)",
          "type": "list",
          "value": []
        },
        {
          "name": "authors",
          "title": "Author(s)",
          "type": "list",
          "value": []
        }
      ]
    }
  ],
  "entities": [
    {
      "class": ["book"],
      "href": "/books/9781491956250",
      "title": "Microservice Architecture"
    }
  ],
  "links": [
    {
      "href": "/books",
      "rel": ["collection", "self"]
    },
    {
      "href": "/books?page=1",
      "rel": ["chapter", "collection", "first"]
    },
    {
      "href": "/books?page=1",
      "rel": ["chapter", "collection", "last"]
    },
    {
      "href": "/",
      "rel": ["root", "parent"]
    }
  ],
  "properties": {
    "EntityCount": 1,
    "title": "All Books",
    "page": 1,
    "pageCount": 1,
    "pageSize": 100,
    "startOfCollection": true,
    "endOfCollection": true
  }
}
```

---

## `/`

---

### The Root Resource

Many APIs ignore the root resource but for hypermedia APIs it is possibly the
most important resource because it is the one URL that will never change. The
root resource will return the list of all top-level and most used resources
offered.

```JSON
{
  "class": ["root"],
  "actions": [
    {
      "class": ["search", "authors"],
      "name": "search-authors",
      "title": "Search Authors",
      "method": "GET",
      "href": "/authors",
      "fields": [
        {
          "name": "name",
          "title": "Author Name",
          "type": "text"
        }
      ]
    },
    {
      "class": ["search", "books"],
      "name": "search-books",
      "title": "Search Books",
      "method": "GET",
      "href": "/books",
      "fields": [
        {
          "name": "title",
          "title": "Book Title",
          "type": "text"
        }
      ]
    },
    {
      "class": ["search", "genres"],
      "name": "search-genres",
      "title": "Search Genres",
      "method": "GET",
      "href": "/genres",
      "fields": [
        {
          "name": "genre",
          "title": "Genre",
          "type": "text"
        }
      ]
    }
  ],
  "links": [
    {
      "href": "/authors",
      "rel": ["collection", "section"],
      "title": "Authors"
    },
    {
      "href": "/books",
      "rel": ["collection", "section"],
      "title": "Books"
    },
    {
      "href": "/genres",
      "rel": ["collection", "section"],
      "title": "Genres"
    },
    {
      "href": "/",
      "rel": ["root", "self"],
      "title": "My Library API"
    }
  ],
  "properties": {
    "title": "My Library API"
  }
}
```

---

## Conclusion

Hypermedia does not remove work; however, it will shift where the work is and
what the nature of the work will be.
