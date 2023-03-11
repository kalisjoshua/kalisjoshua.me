import fs from "fs";
import path from "path";

import { marked } from "marked";

import { Link, PageNode, SiteContentComplete } from "./SanguineTypes";

interface Config extends PageNode {
  navigation: SiteContentComplete["navigation"];
  render: SiteContentComplete["render"];
}

function createPage(dir: string, config: Config): void {
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
  const main: string = marked.parse(raw);
  const html = render({
    includeAbout,
    isArticle,
    main,
    navigation: (navigation as Array<Link>).map(({ href, text }) => ({
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

function mkdirp(filePath: string): void {
  const dir = filePath.split(path.sep).slice(0, -1).join(path.sep);

  if (!fs.existsSync(dir) && !mkdirp[dir]) {
    mkdirp[dir] = true;
    fs.mkdirSync(dir);
  }
}

function outputFiles(dir: string, siteContent: SiteContentComplete): void {
  const { navigation, pages, render } = siteContent;

  pages.forEach((page) => createPage(dir, { navigation, render, ...page }));
}

export { outputFiles };
