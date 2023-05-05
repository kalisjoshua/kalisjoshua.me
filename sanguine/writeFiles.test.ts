import { assertEquals, join, stub } from "../deno.deps.ts";

import { ROOT } from "./__testUtils.ts";

import { writeFiles } from "./writeFiles.ts";

const OUTPUT = join(ROOT, "dist");

const sitemap = [
  { html: "Hello", path: "hello.html" },
  { html: "world", path: "world.html" },
  { html: "foo bar", path: "foo/bar.html" },
];

const mock = stub(Deno, "writeFileSync", () => {});

stub(Deno, "mkdirSync", () => {});

Deno.test("writeFiles", () => {
  writeFiles(OUTPUT, sitemap);

  assertEquals(mock.calls.length, sitemap.length);
});
