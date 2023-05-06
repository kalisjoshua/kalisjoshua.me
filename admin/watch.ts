import { resolve } from "../deno.deps.ts";

import { command } from "./command.ts";

const build = () => console.log(command(resolve("admin", "build.sh")));
const DELAY = 300;
let taskRunning = false;
const watched = ["admin", "content", "public", "sanguine", "styles"];

build();

for await (const { paths } of Deno.watchFs(watched)) {
  if (!taskRunning) {
    taskRunning = true;
    console.log("Change detected.", paths);

    build();

    setTimeout(() => {
      taskRunning = false;
    }, DELAY);
  }
}
