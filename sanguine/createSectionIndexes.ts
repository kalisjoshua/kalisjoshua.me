import path from "path";

import { OrganizedContent } from "./types/OrganizedContent";
import { Summary } from "./types/Summary";

type Sections = { [key: string]: Array<Summary> };

const pull = (content, regex) => (content.match(regex) || []).at(1);

const rDate = /### ([^\n]+)/;
const rIntro = /\n(?!#+|(?:\s*[-*+]|\d+\.\s*)[^\n]+)(.+)/;
const rTitle = /## ([^\n]+)/;

const buildSummaries = (everything) =>
  everything.pages.reduce((acc, file) => {
    const section =
      file.key.indexOf(path.sep) >= 0 ? file.key.split(path.sep).at(0) : false;

    if (section) {
      if (!acc[section]) {
        acc[section] = [];
      }

      const summary = createSummary(file);

      if (!/draft$/i.test(summary.title)) {
        acc[section].push(summary);
      }
    }

    return acc;
  }, {});

const createIndexes = (sections) =>
  Object.keys(sections).map((name) => {
    sections[name] = sections[name]
      .sort((a, b) => a.sorting - b.sorting)
      .reverse();

    const key = path.join(name, "index.html");

    return {
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
      willPublish: true,
    };
  });

const createSummary = ({ key, raw }, date = pull(raw, rDate)): Summary => ({
  date: Date.parse(date) ? date : "",
  intro: pull(raw, rIntro),
  key,
  sorting: Date.parse(date) ? new Date(date).getTime() : 0,
  title: pull(raw, rTitle),
});

function createSectionIndexes(everything: OrganizedContent): OrganizedContent {
  const sections: Sections = buildSummaries(everything);

  everything.pages.push(...createIndexes(sections));

  return everything;
}

export { createSectionIndexes };
