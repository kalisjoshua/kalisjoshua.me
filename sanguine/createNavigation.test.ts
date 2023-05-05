import { assertEquals } from "../deno.deps.ts";

import { createTestFileNode } from "./__testUtils.ts";

import { createNavigation } from "./createNavigation.ts";

const getResult = (pages: Array<ReturnType<typeof createTestFileNode>> = []) =>
  createNavigation({
    meta: {
      contact: "",
      projects: "",
      author: "",
      date: new Date(),
      description: "",
      header: "",
      version: "0.0.0",
    },
    pages,
    template: createTestFileNode("template.html", "markup"),
  });

Deno.test("createNavigation - empty", () => {
  const result = getResult();

  assertEquals(result.navigation, []);
});

Deno.test("createNavigation - pages", () => {
  const result = getResult([
    createTestFileNode("pages/index.md", "## Resume"),

    // excluded files should not be in the nav
    createTestFileNode("pages/recruiters.md", "## Recruiters"),

    // only the index should be included in the nav
    createTestFileNode("pages/articles/index.md", "## Articles Index"),
    createTestFileNode("pages/articles/article-1.md", "## Article 1"),
    createTestFileNode("pages/articles/article-2.md", "## Article 2"),

    // only the index should be included in the nav
    createTestFileNode("pages/slides/index.md", "## Slides Index"),
    createTestFileNode("pages/slides/slides-1.md", "## Slides 1"),
    createTestFileNode("pages/slides/slides-2.md", "## Slides 2"),
  ]);

  assertEquals(result.navigation, [
    {
      href: "index.html",
      text: "Resume",
    },
    {
      href: "articles/index.html",
      text: "Articles",
    },
    {
      href: "slides/index.html",
      text: "Slides",
    },
  ]);
});
