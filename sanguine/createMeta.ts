import { marked } from "marked";

import {
  FileNode,
  SiteContentBasic,
  SiteContentExtended,
  SiteMeta,
} from "./SanguineTypes";
import { pronouns } from "./pronouns";

const pkg = require("../package.json");

function createMeta(everything: SiteContentBasic): SiteContentExtended {
  const oldMeta: Array<FileNode> = everything.meta as Array<FileNode>;
  const meta: SiteMeta = {
    about: "",
    contact: "",
    projects: "",
    ...oldMeta.reduce(
      (acc, { key, raw }) => ({
        ...acc,
        [key.replace(/\..*$/, "")]: marked.parse(raw),
      }),
      {}
    ),
    author: pkg.author.name,
    date: new Date(),
    description: pkg.description,
    header: pronouns(pkg.author.name),
    version: pkg.version,
  };

  return {
    ...everything,
    meta,
  };
}

export { createMeta };
