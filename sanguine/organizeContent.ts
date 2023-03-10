import path from "path";

import { FileNode } from "./types/FileNode";
import { OrganizedContent } from "./types/OrganizedContent";

function organizeContent(everything: Array<FileNode>): OrganizedContent {
  const meta: Array<FileNode> = [];
  const pages: Array<FileNode> = [];
  let template: FileNode | undefined;

  for (const file of everything) {
    if (/^pages/.test(file.key)) {
      const fixedKey = file.key.split(path.sep).slice(1).join(path.sep);

      file.includeAbout = fixedKey === "index.html";
      file.isArticle = /articles\/(?!index\.html)/.test(fixedKey);
      file.key = fixedKey;
      file.rel = "../".repeat(fixedKey.split(path.sep).length - 1) || "./";

      file.willPublish && pages.push(file);
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
