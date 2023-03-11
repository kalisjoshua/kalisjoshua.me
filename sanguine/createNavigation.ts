import path from "path";

import { Link, SiteContentExtended } from "./SanguineTypes";

function createNavigation(
  everything: SiteContentExtended
): SiteContentExtended {
  const navigation: Array<Link> = everything.pages.reduce(
    (acc: Array<Link>, { key }) => {
      if (/index\.html$/.test(key)) {
        const [h, ...t] =
          key === "index.html" ? "resume" : key.split(path.sep)[0];

        acc.push({
          href: key.replace(path.sep, "/"),
          text: `${h.toUpperCase()}${t.join("")}`,
        });
      }

      return acc;
    },
    []
  );

  return { ...everything, navigation };
}

export { createNavigation };
