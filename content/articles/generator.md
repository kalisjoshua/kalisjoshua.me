## Treewalker Generator Recursive Function
### DRAFT

A recursive generator function to walk a directory structure and return nodes.

```javascript
// getPaths.mjs
import fs from "fs"
import path from "path"

const getPaths = (...args) => Array.from(getPaths(...args))

// sourced from: https://exploringjs.com/impatient-js/ch_sync-generators.html#reusing-traversals
function* getPathsGen (dir, cwd) {
  for (const fileName of fs.readdirSync(dir)) {
    const filePath = path.resolve(dir, fileName)

    // yield filePath.replace(cwd, "")

    if (fs.statSync(filePath).isDirectory()) {
      yield* getPaths(filePath, cwd)
    } else {
      yield filePath.replace(cwd, "")
    }
  }
}

export {
  getPaths,
}
```

#### Usage

```javascript
import {getPaths} from "./getPaths.mjs"

const paths = getPaths('./content', `${process.cwd()}/`)

console.log(paths)
```
