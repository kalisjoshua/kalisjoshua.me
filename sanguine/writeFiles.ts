import { join, sep } from "../deno.deps.ts";

import { renderPages } from "./renderPages.ts";

const encoder = new TextEncoder();

function writeFiles(dir: string, pages: ReturnType<typeof renderPages>): void {
  pages.forEach(({ html, path }) => {
    const dest = join(dir, path);
    const folder = dest.split(sep).slice(0, -1).join(sep);

    Deno.mkdirSync(folder, { recursive: true });

    Deno.writeFileSync(dest, encoder.encode(html));
  });
}

export { writeFiles };
