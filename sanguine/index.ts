import path from "path";

import { collectPaths } from "./collectPaths";
import { createMeta } from "./createMeta";
import { createNavigation } from "./createNavigation";
import { createRenderer } from "./createRenderer";
import { createSectionIndexes } from "./createSectionIndexes";
import { getContent } from "./getContent";
import { organizeContent } from "./organizeContent";
import { outputFiles } from "./outputFiles";
import { pipe } from "./pipe";

const pkg = require("../package.json");

const CWD = process.cwd();
const OUTPUT = path.join(CWD, pkg.config.output_dir);
const SOURCE = path.join(CWD, pkg.config.source_dir);

pipe([
  SOURCE,
  collectPaths,
  (data) => getContent(SOURCE, data),
  organizeContent,
  createSectionIndexes,
  createMeta,
  createNavigation,
  createRenderer,
  (data) => outputFiles(OUTPUT, data),
]);
