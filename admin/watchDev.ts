const DELAY = 300;
let taskRunning = false;
const watched = ["admin", "content", "public", "sanguine", "styles"];

for await (const { paths } of Deno.watchFs(watched)) {
  if (!taskRunning) {
    taskRunning = true;
    console.log("Change detected.", paths);

    await Deno.run({ cmd: ["deno", "task", "build"] }).status();

    setTimeout(() => {
      taskRunning = false;
    }, DELAY);
  }
}
