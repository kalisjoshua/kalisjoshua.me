import { join, loadSync, walkSync } from "../deno.deps.ts";

import { addFileNodeContent } from "./addFileNodeContent.ts";
import { collectMeta } from "./collectMeta.ts";
import { createFileNodes } from "./createFileNode.ts";
import { createNavigation } from "./createNavigation.ts";
import { createRenderFn } from "./createRenderFn.ts";
import { createSectionIndexes } from "./createSectionIndexes.ts";
import { organizeContent } from "./organizeContent.ts";
import { pipe } from "./pipe.ts";
import { renderPages } from "./renderPages.ts";
import { writeFiles } from "./writeFiles.ts";

const CWD = Deno.cwd();
const ENV = loadSync();
const OUTPUT: string = join(CWD, ENV["PUB_DIR"]);
const SOURCE: string = join(CWD, ENV["SRC_DIR"]);

const readFiles = (dir: string) =>
  Array.from(
    walkSync(dir, {
      includeDirs: false,
      match: [/\.html$/, /\.md$/],
      skip: [/cover-letters/],
    }),
  );

pipe(
  SOURCE,
  readFiles,
  createFileNodes.bind(null, CWD),
  addFileNodeContent,
  organizeContent,
  createSectionIndexes,
  collectMeta,
  createNavigation,
  createRenderFn,
  renderPages,
  writeFiles.bind(null, OUTPUT),
);
