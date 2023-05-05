import { join, sep, WalkEntry } from "../deno.deps.ts";

function createFileNodes(CWD: string, all: Array<WalkEntry> = []) {
  if (!all.length) {
    throw new Error("No files provided.");
  }

  return all.map(({ path }) => createFileNode(CWD, path));
}

/**
 * - `name`    - the file name
 * - `path`    - the full (system) path to the file
 * - `rel`     - the path relative to what will be the site root when published
 * - `section` - section of the site; "articles" or "slides"
 * - `type`    - the file type [md, html]
 */
function createFileNode(ext: string, path: string) {
  const dir = path
    // remove the project parent (external) directories
    .replace(ext, "")
    // remove sanguine organizational folders
    .replace(join("content", "pages"), "")
    // break into path parts
    .split(sep);
  const fileName = dir.pop() || "";
  const [name, type] = fileName.split(".");

  return {
    name,
    path,
    get rel() {
      const split = this.section.split("/");

      return this.section && split.length
        ? split.reduce((a) => a + "../", "")
        : "./";
    },
    section: dir.slice(2).join("/"),
    type,
  };
}

export { createFileNode, createFileNodes };
