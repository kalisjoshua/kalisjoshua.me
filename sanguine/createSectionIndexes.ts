import path from "path";

import { pipe } from "./pipe";
import { FileNode, PageNode, SiteContentBasic } from "./SanguineTypes";

type Summary = {
  date: Date | string;
  intro: string;
  key: string;
  sorting: number;
  title: string;
};

const pull = (content, regex) => (content.match(regex) || []).at(1);

const rDate = /### ([^\n]+)/;
const rIntro = /\n(?!#+|(?:\s*[-*+]|\d+\.\s*)[^\n]+)(.+)/;
const rTitle = /## ([^\n]+)/;

function buildSummaries(
  pages: Array<PageNode>
): Record<string, Array<Summary>> {
  return pages.reduce((acc, file) => {
    const section =
      file.key.indexOf(path.sep) >= 0 ? file.key.split(path.sep).at(0) : false;

    if (section) {
      if (!acc[section]) {
        acc[section] = [];
      }

      const summary = summarize(file);

      if (!/draft$/i.test(summary.title)) {
        acc[section].push(summary);
      }
    }

    return acc;
  }, {});
}

const createIndexes = (
  sections: ReturnType<typeof buildSummaries>
): Array<PageNode> =>
  Object.keys(sections).map((name) => {
    sections[name] = sections[name]
      .sort((a, b) => a.sorting - b.sorting)
      .reverse();

    const key = path.join(name, "index.html");

    return {
      includeAbout: false,
      isArticle: false,
      key,
      raw: sections[name]
        .map(
          ({ date, intro, key, title }) =>
            `**[${title}](${key.replace(name, "").replace(path.sep, "")})**${
              date && " - " + date
            }\n\n${intro}`
        )
        .join("\n\n"),
      rel: "../".repeat(key.split(path.sep).length - 1) || "./",
    };
  });

function createSectionIndexes(everything: SiteContentBasic): SiteContentBasic {
  pipe([
    everything.pages,
    buildSummaries,
    createIndexes,
    (indexes: ReturnType<typeof createIndexes>): void => {
      everything.pages.push(...indexes);
    },
  ]);

  return everything;
}

function summarize({ key, raw }: FileNode): Summary {
  const date = pull(raw, rDate);

  return {
    date: Date.parse(date) ? date : "",
    intro: pull(raw, rIntro),
    key,
    sorting: Date.parse(date) ? new Date(date).getTime() : 0,
    title: pull(raw, rTitle),
  };
}

export { createSectionIndexes };
