import { assertEquals } from "../deno.deps.ts";

import { pipe } from "./pipe.ts";

Deno.test("pipe - returns unknown", () => {
  const result = pipe(
    10,
    (x: number) => x * 4,
    (x: number) => x + 2,
  );

  assertEquals(result, 42);
});
