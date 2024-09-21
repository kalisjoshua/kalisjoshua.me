import { assertEquals } from "../deno.deps.ts";

import { createTestFileNode } from "./__testUtils.ts";

import { collectMeta } from "./collectMeta.ts";
import pkg from "../package.json" with { type: "json" };

import { pronouns } from "./pronouns.ts";

const content = {
  contact: "here is how to contact someone",
  projects: "these are some things completed",
};
const siteConfig = {
  meta: [
    createTestFileNode("content/contact", content.contact),
    createTestFileNode("content/projects", content.projects),
  ],
  pages: [],
  template: createTestFileNode("content/template", "markup"),
};

Deno.test("collectMeta", () => {
  const now = new Date();
  const result = collectMeta(siteConfig, now);

  assertEquals(result, {
    meta: {
      contact: `<p>${content.contact}</p>\n`,
      projects: `<p>${content.projects}</p>\n`,
      author: pkg.author.name,
      date: now,
      description: pkg.description,
      header: pronouns(pkg.author.name),
      version: pkg.version as ReturnType<typeof collectMeta>["meta"]["version"],
    },
    pages: [],
    template: siteConfig.template,
  });
});
