import path from "path";

import { FileNode, PageNode, SiteContentBasic } from "./SanguineTypes";

function organizeContent(everything: Array<FileNode>): SiteContentBasic {
  const meta: Array<FileNode> = [];
  const pages: Array<PageNode> = [];
  let template: FileNode | undefined;

  for (const file of everything) {
    if (/^pages/.test(file.key)) {
      const fixedKey = file.key.split(path.sep).slice(1).join(path.sep);

      if (file.key.includes(path.sep)) {
        pages.push({
          includeAbout: fixedKey === "index.html",
          isArticle: /articles\/(?!index\.html)/.test(fixedKey),
          key: fixedKey,
          raw: file.raw,
          rel: "../".repeat(fixedKey.split(path.sep).length - 1) || "./",
        });
      }
    } else if (/^template/.test(file.key)) {
      template = file;
    } else if (file.key.indexOf(path.sep) < 0) {
      meta.push(file);
    }
  }

  if (!template) throw new Error("No template file found.");

  return {
    meta,
    pages,
    template,
  };
}

export { organizeContent };
