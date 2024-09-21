import { assertEquals } from "../deno.deps.ts";

import { HREF, pronouns } from "./pronouns.ts";

const expected = (name: string, href = HREF) =>
  `${name} <small><a href="${href}" title="Why I put my pronouns on my email signature and you should too.">(he/him/his)</a></small>`;

Deno.test("pronouns", () => {
  const link = "https://example.com";
  const name = "Joshua";

  assertEquals(pronouns(name), expected(name));
  assertEquals(pronouns(name, link), expected(name, link));
});
