import { assertSnapshot } from "../deno.deps.ts";

import { createTestFileNode } from "./__testUtils.ts";
import { createRenderFn, PageContext } from "./createRenderFn.ts";

import { renderPages } from "./renderPages.ts";

type SiteContent = ReturnType<typeof createRenderFn>;

const isActive = (href: string, section: string, path = "") =>
  href === path || (!!section && href.startsWith(section)) ? "isActive" : "";
const render = ({ main, navigation, path, rel, section }: PageContext) => `
<ul>
${navigation
  .map(
    ({ href, text }) =>
      `<li><a class="${isActive(
        href,
        section,
        path
      )}" href="${rel}${href}">${text}</a></li>`
  )
  .join("\n")}
</ul>
<main>
${main}
</main>
`;
const siteContent: SiteContent = {
  pages: [
    createTestFileNode("pages/about.md", "# Hello\n\n\nAbout me."),
    createTestFileNode("pages/index.md", "# Resume"),

    createTestFileNode("pages/articles/index.md", "# Articles Index"),
    createTestFileNode("pages/articles/something.md", "# Somthing"),
    createTestFileNode("pages/articles/another.md", "# Another"),
  ],
  navigation: [
    { href: "index.html", text: "Resume" },
    { href: "about.html", text: "About" },
    { href: "articles/index.html", text: "Articles" },
  ],
  render,
};

Deno.test("renderPages", async (testContext) => {
  const result = renderPages(siteContent).flatMap(
    (page: Record<string, string>) => `${page.path}\n${page.html}`.split("\n")
  );

  // this formatting - array of strings (one per line) - is preferrable to the
  // default multiline formatting done by Deno
  await assertSnapshot<string[]>(testContext, result);
});
