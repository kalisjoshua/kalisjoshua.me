import { createFileNodes } from "./createFileNode.ts";

type CreateFileNodes = ReturnType<typeof createFileNodes>;

const decoder = new TextDecoder("utf-8");

const addFileNodeContent = (allFiles: CreateFileNodes) =>
  allFiles.map((fileNode) => ({
    ...fileNode,
    raw: decoder.decode(Deno.readFileSync(fileNode.path)),
  }));

/**
 * - `raw` - the contents of the file
 */
export type FileNodeContent = ReturnType<typeof addFileNodeContent>[0];
export { addFileNodeContent };
