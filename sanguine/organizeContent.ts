import { addFileNodeContent } from "./addFileNodeContent.ts";

type FileNodeList = ReturnType<typeof addFileNodeContent>;
type FileNode = FileNodeList[0];

const rPage = /content\/pages/i;

function organizeContent(siteContent: FileNodeList) {
  if (!siteContent.length) {
    throw new Error("Nothing provided.");
  }

  const meta: FileNodeList = [];
  const pages: FileNodeList = [];
  let template: FileNode | undefined;

  for (const file of siteContent) {
    const inPagesDir = rPage.test(file.path);
    const isMDFile = file.type === "md";

    if (inPagesDir && isMDFile) {
      pages.push(file);
    } else if (!inPagesDir && file.name === "template") {
      template = file;
    } else if (file.type === "md") {
      meta.push(file);
    } else {
      throw new Error(`Uncategorized file; "${file.path}"`);
    }
  }

  if (!template) throw new Error("No template file.");
  if (!pages.length) throw new Error("No pages.");

  return { meta, pages, template };
}

export { organizeContent };
