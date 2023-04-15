import { createFileNode } from "./createFileNode.ts";

const ROOT = "/path/to/projects/pro";

const createTestFileNode = (rel: string, raw: string) => ({
  ...createFileNode(ROOT, `${ROOT}/content/${rel}`),
  raw,
});

export { createTestFileNode, ROOT };
