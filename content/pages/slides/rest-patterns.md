## REST Is Easy!

---

## Resource Modeling

And by "REST is Easy!" I really mean "resource modeling is easy". Which becomes
completely immaterial once hypermedia is fully embraced.

*Warning, opinions ahead.*

---

## Rules

  1. Everything is a Resource.
  2. Resources are either: Entities and Entity Collections.
      1. Entities are the business concepts the API attempts to solve for.
      2. Collections contain many Entities.
  3. Don't leak your data relationships in your API.
  4. There is an exception to every rule (also a rule for life).

---

## REST Resource Patterns

  1. Root Resource (`/`)
  2. Enterprise Entities and Sub-entities (`/books/{ISBN}`)
  3. Entity Collections (`/books`)
  4. Calculation (`/calculators/LTV`)
  5. Ephemeral (`/searches/{SearchId}`)

---

## Anti-pattern

**Avoid**

```
GET|PUT /resource/{ID}/subResource/{subResourceID}/subSubResource/{SSRID}
```

**Better**

```
GET|PUT /resource/{ID}
GET|PUT /subResource/{subResourceID}
GET|PUT /subSubResource/{SSRID}
```
