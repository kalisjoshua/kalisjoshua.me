import { assertEquals } from "deno/testing/asserts.ts";

import { createTestFileNode } from "./__testUtils.ts";

import { createRenderFn } from "./createRenderFn.ts";

const date = new Date();
const navigation = [
  { href: "home", text: "home" },
  { href: "about", text: "about" },
];
const requestRenderFn = (markup: string) =>
  createRenderFn({
    meta: {
      author: "Me",
      contact: "### Contact Info",
      date,
      description: "Some stuff.",
      header: "He/Him/His",
      projects: "### My Projects",
      version: "0.0.0",
    },
    pages: [
      createTestFileNode("pages/home.md", "# Home"),
      createTestFileNode("pages/about.md", "# About"),
      createTestFileNode("pages/section/index.md", "# Section Index"),
      createTestFileNode("pages/section/topic.md", "# Some Topic"),
    ],
    navigation,
    template: createTestFileNode("template.html", markup),
  });

Deno.test("createRenderFn - simplest test; no processing", () => {
  const expected = "test";
  const { render } = requestRenderFn(expected);
  const pageContext = {
    main: "",
    navigation,
    path: "",
    rel: "",
    section: "",
  };

  assertEquals(render(pageContext), expected);
});

Deno.test("createRenderFn - full test", () => {
  // NOTE: No need to test that each prop from pageContext or meta are getting
  // into the template; if any are getting in, they should all be doing so if
  // they are provided. It is important to test at least a few are getting in,
  // to prove that available props will be used in template literal. After that
  // it is important to test the custom "blocks" logic.
  const expected = `
  <meta name="description" content="Some stuff." />
  <meta name="date" content="${date}" />
  <meta name="version" content="0.0.0" />

  `;
  const footer = `
  <footer class="contentinfo">
    <p>Written by <a href="./index.html">He/Him/His</a>.</p>
  </footer>
  `;
  const { render } = requestRenderFn(`
  <meta name="description" content="\${description}" />
  <meta name="date" content="\${date}" />
  <meta name="version" content="\${version}" />

  {{?isArticle}}
  <footer class="contentinfo">
    <p>Written by <a href="\${rel}index.html">\${header}</a>.</p>
  </footer>
  {{?/}}
  `);
  const pageContext = {
    main: "# Hello.",
    navigation,
    path: "",
    rel: "./",
    section: "",
  };

  // no custom block
  assertEquals(render(pageContext).trim(), expected.trim());

  // with custom block
  assertEquals(
    render({ ...pageContext, isArticle: true }).trim(),
    `${expected}${footer.trim()}`.trim(),
  );

  assertEquals(
    render({ ...pageContext, isArticle: false }).trim(),
    expected.trim(),
  );
});
