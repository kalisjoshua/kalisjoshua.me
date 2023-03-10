import { marked } from "marked";

import { OrganizedContent } from "./types/OrganizedContent";
import { pronouns } from "./pronouns";

const pkg = require("../package.json");

function createMeta(everything: OrganizedContent) {
  const meta = {
    ...everything.meta.reduce(
      (acc, { key, raw }) => ({
        ...acc,
        [key.replace(/\..*/, "")]: marked.parse(raw),
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
