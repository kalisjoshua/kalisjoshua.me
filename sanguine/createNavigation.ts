import path from "path";

function createNavigation(everything) {
  everything.navigation = everything.pages.reduce((acc, { key }) => {
    if (/index\.html$/.test(key)) {
      const [h, ...t] =
        key === "index.html" ? "resume" : key.split(path.sep)[0];

      acc.push({
        href: key.replace(path.sep, "/"),
        text: `${h.toUpperCase()}${t.join("")}`,
      });
    }

    return acc;
  }, []);

  return everything;
}

export { createNavigation };
