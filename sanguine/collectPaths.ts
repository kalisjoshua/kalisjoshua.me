import fs from "fs";
import path from "path";

const collectPaths = (dir: string): Array<string> =>
  Array.from(getPathsGen(dir));

// adapted from: https://exploringjs.com/impatient-js/ch_sync-generators.html#reusing-traversals
function* getPathsGen(dir: string) {
  for (const fileName of fs.readdirSync(dir)) {
    const filePath = path.resolve(dir, fileName);

    if (fs.statSync(filePath).isDirectory()) {
      yield* collectPaths(filePath);
    } else {
      yield filePath;
    }
  }
}

export { collectPaths };
