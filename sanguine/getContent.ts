import fs from "fs";
import path from "path";

import { FileNode } from "./SanguineTypes";

function getContent(parent: string, files: Array<string>): Array<FileNode> {
  return files.map((filepath): FileNode => {
    const relativePath = filepath.replace(parent, "").replace(path.sep, "");
    const parts = relativePath.split(path.sep);
    const file = (parts.at(-1) || "").replace(/\.md$/, ".html");

    return {
      key: path.join(...parts.slice(0, -1), file),
      raw: fs.readFileSync(filepath, "utf8"),
    };
  });
}

export { getContent };
