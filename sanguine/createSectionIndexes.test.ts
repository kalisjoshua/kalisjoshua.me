import { assertEquals } from "../deno.deps.ts";

import { createTestFileNode } from "./__testUtils.ts";

import { createSectionIndexes } from "./createSectionIndexes.ts";

const pages = [
  // these should NOT be in the index
  createTestFileNode("pages/index.md", "# Resume"),
  createTestFileNode("pages/recruiters.md", "# Recruiters"),

  // these SHOULD be in the index
  createTestFileNode(
    "pages/articles/article.md",
    "## Article\n\n### 2 Jan 2023",
  ),
  createTestFileNode(
    "pages/articles/project.md",
    "## Project\n\n### 3 Jan 2023",
  ),
  createTestFileNode(
    "pages/articles/learning.md",
    "## Learning\n\n### 1 Jan 2023",
  ),

  // drafts should be excluded
  createTestFileNode("pages/articles/wip.md", "## WIP DRAFT\n\n### "),
  createTestFileNode("pages/articles/another.md", "## Idea DRAFT\n\n### "),

  // these SHOULD be in another index
  createTestFileNode("pages/slides/functions.md", "## Functions"),
  createTestFileNode("pages/slides/hypermedia.md", "## Hypermedia"),
  createTestFileNode("pages/slides/rest.md", "## REST"),
];

Deno.test("createSectionIndexes", () => {
  const result = createSectionIndexes({
    meta: [],
    pages,
    template: createTestFileNode("template.html", "layout markup"),
  });

  const indexes = result.pages.slice(-2);

  const fileNames = indexes.map(({ section }) => section);
  assertEquals(fileNames, ["articles", "slides"]);

  const fileNodeName = indexes.map(({ name }) => name);
  assertEquals(fileNodeName, ["index", "index"]);

  const flags = indexes.map(
    // if there is no `path` value then the page is a generated index
    ({ path, section }) => !!path && section === "articles",
  );
  assertEquals(flags, [false, false]);

  const ordering = indexes.map(({ raw }) => raw.match(/\(.*?\.html\)/g));
  assertEquals(ordering, [
    // articles should be ordered by (publish) date if it is available
    ["(project.html)", "(article.html)", "(learning.html)"],
    // slides without (publish) date are ordered as they are on the filesystem
    ["(functions.html)", "(hypermedia.html)", "(rest.html)"],
  ]);
});
