import { FileNodeContent } from "./addFileNodeContent.ts";
import { organizeContent } from "./organizeContent.ts";

const rDate = /### ([^\n]+)/;
const rDraft = /draft$/i;
const rIntro = /\n(?!#+|(?:\s*[-*+]|\d+\.\s*)[^\n]+)(.+)/;
const rTitle = /## ([^\n]+)/;

const extractPattern = (regex: RegExp, content: string) =>
  (content.match(regex) || []).at(1) || "";
const isDraft = (title: string) => rDraft.test(title);

function createSectionIndexes(siteContent: ReturnType<typeof organizeContent>) {
  const sections = siteContent.pages.reduce((acc, item) => {
    if (item.section && !acc[item.section]) {
      acc[item.section] = {
        // keeping most fields as a template
        ...item,
        // change name
        name: "index",
        // path will be empty because it will not be a real file
        path: "",
        // generate the index markdown (raw) content
        raw: siteContent.pages
          .filter((fileNode) => fileNode.section === item.section)
          .map(summarize)
          .sort(([a], [b]) => b - a)
          .map(([_, summary]) => summary)
          .join("\n\n\n"),
      };
    }

    return acc;
  }, {} as Record<string, FileNodeContent>);

  const indexes = Object.values(sections);

  if (indexes.length) {
    siteContent.pages.push(...indexes);
  }

  return siteContent;
}

function summarize(fileNode: FileNodeContent): [number, string] {
  const title = extractPattern(rTitle, fileNode.raw);

  if (isDraft(title)) {
    return [0, ""];
  }

  const rawDate = extractPattern(rDate, fileNode.raw);
  const dateParsed = Date.parse(`${rawDate}`);
  const date = dateParsed ? ` - ${rawDate}` : "";
  const intro = extractPattern(rIntro, fileNode.raw);

  return [
    // TODO: substitute string to number conversion for title sorting a-z
    dateParsed || 0,
    `**[${title}](${fileNode.name}.html)**${date}\n\n${intro}`,
  ];
}

export { createSectionIndexes };
