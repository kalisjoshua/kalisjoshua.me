## JSON Query

### 10 Nov 2023

I had a relational dataset in JSON format that I wanted to be able to query like SQL but could not find a package that would did what I was looking for. So... I built it.

```javascript
const isFn = (arg) => /function/i.test({}.toString.call(arg));
const isAr = (arg) => /array/i.test({}.toString.call(arg));

function addQueries(root) {
  function withQueries(table) {
    return Object.defineProperties(table, {
      inner: {
        enumerable: false,
        value(prop, fn) {
          const working = structuredClone(table);

          working.map((item) => {
            item[prop] = fn(withQueries(item[prop]));

            return item;
          });

          return working;
        },
      },
      join: {
        enumerable: false,
        value(...args) {
          let result;

          if (args.length > 2 || args.length < 1) {
            throw new Error(
              `Invalid number of arguments, expected 1 or 2; received "${args.length}"`
            );
          } else if (args.length === 2) {
            if (!isAr(args[0]) || !isAr(args[1])) {
              throw new Error(
                `Expected two string arrays "[["table_name", "id_column"], ["table_name", "id_column"]]"; provided ${args}`
              );
            }

            const [[table1, column1], [table2, column2]] = args;

            result = structuredClone(table).map((sourceItem) => {
              sourceItem[table2] = root[table1]
                .filter(({ [column1]: v1 }) => sourceItem[column1] === v1)
                .map(({ [column2]: v2 }) => {
                  return structuredClone(
                    root[table2].find((joinItem) => joinItem[column2] === v2)
                  );
                });

              return sourceItem;
            });
          } else {
            if (!isAr(args[0])) {
              throw new Error(
                `Expected string array "[["table_name", "id_column"]]"; provided ${args}`
              );
            }

            const [[table1, column1]] = args;

            result = structuredClone(table).map((sourceItem) => {
              sourceItem[table1] = root[table1].filter(
                ({ [column1]: v1 }) => sourceItem[column1] === v1
              );

              return sourceItem;
            });
          }

          return withQueries(result);
        },
      },
      where: {
        enumerable: false,
        value: (col, fn) =>
          withQueries(
            table.filter(({ [col]: val }) => (isFn(fn) ? fn(val) : fn === val))
          ),
      },
    });
  }

  return [
    root,
    structuredClone,
    Object.entries,
    (all) => all.map(([key, val]) => [key, withQueries(val)]),
    Object.fromEntries,
  ].reduce((acc, fn) => fn(acc));
}
```

This function `withQueries` enables the types of interactions I was looking for by recursively applying itself to its results.

Given a simple data structure of relational data in JSON format that dataset can be queried fairly simply.

```javascript
const db = addQueries({
  accounts: [
    { account_id: 1234, name: "foo" },
    { account_id: 5678, name: "bar" },
    { account_id: 1111, name: "qux" },
  ],
  accounts_users: [
    { account_id: 1234, user_id: 1 },
    { account_id: 1234, user_id: 2 },
    { account_id: 5678, user_id: 2 },
    { account_id: 5678, user_id: 3 },
  ],
  notes: [
    { user_id: 1, note: "Hello" },
    { user_id: 1, note: "world" },
    { user_id: 3, note: "lorem" },
    { user_id: 3, note: "ipsum" },
    { user_id: 3, note: "dolor" },
    { user_id: 3, note: "sit" },
    { user_id: 3, note: "amet" },
  ],
  users: [
    { user_id: 1, name: "Happy" },
    { user_id: 2, name: "little" },
    { user_id: 3, name: "cloud" },
  ],
});

const filterFunction = (val) => /(.)\1+/.test(val.toString());

// simple value filter
db.accounts.where("name", "foo");

// complex value filter
db.accounts.where("account_id", filterFunction);

// inner join 2 tables (one-to-many)
db.users.join(["notes", "user_id"]);

// inner join 3 tables (many-to-many)
db.accounts.join(["accounts_users", "account_id"], ["users", "user_id"]);

// join everything; from the perspective of users
db.users
  .join(["notes", "user_id"])
  .join(["accounts_users", "user_id"], ["accounts", "account_id"]);

// join everything; from the perspective of accounts
db.accounts
  .join(["accounts_users", "account_id"], ["users", "user_id"])
  .inner("users", (user) => user.join(["notes", "user_id"]));
```
