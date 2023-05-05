import { assertEquals, assertThrows } from "../deno.deps.ts";

import { createTestFileNode, ROOT } from "./__testUtils.ts";

import { organizeContent } from "./organizeContent.ts";

type TestDataConfig = {
  [P in "articles" | "meta" | "pages"]?: Array<string>;
};

function buildTestData(config: TestDataConfig = {}) {
  const articles = [
    "pages/articles/alpha.md",
    "pages/articles/omega.md",
    "pages/articles/index.md",
    ...(config.articles || []),
  ].map((str) => ({ ...createTestFileNode(str, str), isArticle: true }));
  const meta = ["contact.md", "projects.md", ...(config.meta || [])].map(
    (str) => createTestFileNode(str, str),
  );
  const pages = [
    "pages/index.md",
    "pages/recruiters.md",
    ...(config.pages || []),
  ].map((str) => createTestFileNode(str, str));
  const template = createTestFileNode("/template.html", "markup");

  const input = [...meta, template, ...pages, ...articles];

  const output = {
    meta,
    pages: pages.concat(...articles),
    template,
  };

  return { input, output };
}

Deno.test("organizeContent - nothing", () => {
  assertThrows(() => organizeContent([]), Error, "Nothing provided.");
});

Deno.test("organizeContent - no root template", () => {
  assertThrows(
    () => organizeContent([createTestFileNode("content/nope.md", "")]),
    Error,
    "No template file.",
  );
});

Deno.test("organizeContent - no content", () => {
  assertThrows(
    () =>
      organizeContent([createTestFileNode("content/template.html", "markup")]),
    Error,
    "No pages.",
  );
});

Deno.test("organizeContent - content", () => {
  const { input, output } = buildTestData();

  assertEquals(organizeContent(input), output);
});

Deno.test("organizeContent - invalid pages content", () => {
  const rel = "pages/error";
  const { input } = buildTestData({
    pages: [rel],
  });

  assertThrows(
    () => {
      const result = organizeContent(input);

      console.log(result);
    },
    Error,
    `Uncategorized file; "${ROOT}/content/${rel}"`,
  );
});
