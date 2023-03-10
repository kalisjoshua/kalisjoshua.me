import { FileNode } from "./FileNode";

type OrganizedContent = {
  meta: Array<FileNode>;
  pages: Array<FileNode>;
  template: FileNode;
};

export { OrganizedContent };
