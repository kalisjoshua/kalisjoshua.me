import { assertEquals, returnsNext, stub } from "../deno.deps.ts";

import { createFileNode } from "./createFileNode.ts";

import { addFileNodeContent } from "./addFileNodeContent.ts";

const bufferLike = (str: string) =>
  new Uint8Array(str.split("").map((char) => char.charCodeAt(0)));

Deno.test("addFileNodeContent - one file", () => {
  const node = createFileNode(
    "/sys/fs/folders",
    "/sys/fs/folders/project/meta.md"
  );
  const raw = "# Hello, world!";

  stub(Deno, "readFileSync", returnsNext([bufferLike(raw)]));

  assertEquals(addFileNodeContent([node]), [{ ...node, raw }]);
});
