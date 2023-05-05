import { assertEquals, assertThrows, join } from "../deno.deps.ts";

import { createFileNode, createFileNodes } from "./createFileNode.ts";

function testData(relPath: Array<string>): [Array<string>, typeof output] {
  const fullPath = ["root", "system", "paths", "project", ...relPath];

  const parentDir = fullPath.slice(0, 4);
  const [name, type] = fullPath
    .at(-1)!
    .match(/^(.*?)\.(.*)$/)!
    .slice(1);
  const path = join(...fullPath);

  const input = [join(...parentDir), path];
  const output = {
    name,
    path,
    get rel() {
      const split = this.section.split("/");

      return this.section && split.length
        ? split.reduce((a) => a + "../", "")
        : "./";
    },
    section: relPath.length <= 3 ? "" : relPath.slice(2, -1).join("/"),
    type,
  };

  return [input, output];
}

Deno.test("createFileNode - no files", () => {
  const [[parentDir]] = testData(["content", "meta.md"]);

  assertThrows(
    () => {
      createFileNodes(parentDir);
    },
    Error,
    "No files provided.",
  );
});

Deno.test("createFileNode - meta files", () => {
  const [[parentDir, path], output] = testData(["content", "meta.md"]);

  assertEquals(createFileNode(parentDir, path), output);
});

Deno.test("createFileNode - pages files", () => {
  const [[parentDir, path], output] = testData([
    "content",
    "pages",
    "index.md",
  ]);

  assertEquals(createFileNode(parentDir, path), output);
});

Deno.test("createFileNode - articles files", () => {
  const [[parentDir, path], output] = testData([
    "content",
    "pages",
    "articles",
    "index.md",
  ]);

  assertEquals(createFileNode(parentDir, path), output);
});

Deno.test("createFileNode - deeply-nested sections", () => {
  const [[parentDir, path], output] = testData([
    "content",
    "pages",
    "deeply",
    "nested",
    "section",
    "index.md",
  ]);

  assertEquals(createFileNode(parentDir, path), output);
});
