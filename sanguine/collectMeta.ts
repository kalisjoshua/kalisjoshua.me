import { parsedown } from "../deno.deps.ts";

import { pronouns } from "./pronouns.ts";
import { organizeContent } from "./organizeContent.ts";

type SiteContent = ReturnType<typeof organizeContent>;

import pkg from "../package.json" assert { type: "json" };

type SemVer = `${number}.${number}.${number}`;

const collectMeta = (siteContent: SiteContent, publishDate = new Date()) => ({
  ...siteContent,
  meta: {
    ...siteContent.meta.reduce(
      (acc, { name, raw }) => ({
        ...acc,
        [name]: parsedown(raw),
      }),
      { contact: "", projects: "" }
    ),
    author: pkg.author.name,
    date: publishDate,
    description: pkg.description,
    header: pronouns(pkg.author.name),
    version: pkg.version as SemVer,
  },
});

export { collectMeta };
