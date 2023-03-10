import fs from "fs";
import path from "path";

import { marked } from "marked";

function createPage(dir, config) {
  const {
    includeAbout,
    isArticle,
    key,
    navigation,
    raw,
    rel,
    render,
    // willPublish,
  } = config;

  const filePath = path.join(dir, ...key.split(path.sep));
  const main = marked.parse(raw);
  const html = render({
    includeAbout,
    isArticle,
    main,
    navigation: navigation.map(({ href, text }) => ({
      href: `${rel}${href}`,
      style: getStyle(key, href),
      text,
    })),
    rel,
    section: key.indexOf(path.sep) > 0 ? key.split(path.sep)[0] : "resume",
  });

  mkdirp(filePath);
  fs.writeFileSync(filePath, html, "utf8");
}

function getStyle(key: string, href: string): string {
  const section = href.split(path.sep).slice(0, -1).join(path.sep);
  const isActive = key === href || (section && key.startsWith(section));

  return isActive ? "active" : "";
}

function mkdirp(filePath) {
  const dir = filePath.split(path.sep).slice(0, -1).join(path.sep);

  if (!fs.existsSync(dir) && !mkdirp[dir]) {
    mkdirp[dir] = true;
    fs.mkdirSync(dir);
  }
}

function outputFiles(dir, { navigation, pages, render }) {
  pages.forEach((page) => createPage(dir, { navigation, render, ...page }));
}

export { outputFiles };
