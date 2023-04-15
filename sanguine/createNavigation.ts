import { collectMeta } from "./collectMeta.ts";

type CollectMeta = ReturnType<typeof collectMeta>;
type Link = { href: string; text: string };
type SiteContent = ReturnType<typeof createNavigation>;

const exclude = ["recruiters"];
const labelText = (str: string) => `${str.at(0)!.toUpperCase()}${str.slice(1)}`;
const resumeOrSection = (str: string) => (str === "index" ? "resume" : str);

function createNavigation(siteContent: CollectMeta) {
  const navigation: Array<Link> = siteContent.pages.reduce(
    (acc: Array<Link>, page) => {
      const isNav = page.section === "" ||
        page.name === "index" ||
        page.name === page.section;

      if (isNav && !exclude.includes(page.name)) {
        acc.push({
          href: `${page.section}/${page.name}.html`.replace(/^\//, ""),
          text: labelText(resumeOrSection(page.section || page.name)),
        });
      }

      return acc;
    },
    [],
  );

  return { ...siteContent, navigation };
}

export type { Link, SiteContent };
export { createNavigation };
