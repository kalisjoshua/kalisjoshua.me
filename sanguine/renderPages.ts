import { marked } from "../deno.deps.ts";

import { FileNodeContent } from "./addFileNodeContent.ts";
import { createRenderFn } from "./createRenderFn.ts";

type SiteContent = ReturnType<typeof createRenderFn>;

function genPage(siteContent: SiteContent, page: FileNodeContent) {
  const { navigation, render } = siteContent;
  const path = `${page.section && `${page.section}/`}${page.name}.html`;

  return {
    html: render({
      isActive: (href: string) =>
        href === path || (page.section && href.startsWith(page.section))
          ? "active"
          : "",
      isArticle: page.section === "articles" && page.name !== "index",
      main: marked.parse(page.raw),
      navigation,
      path,
      rel: page.rel,
      section: page.section || page.name,
    }),
    path,
  };
}

function renderPages(siteContent: SiteContent) {
  return siteContent.pages.map((page) => genPage(siteContent, page));
}

export { renderPages };
