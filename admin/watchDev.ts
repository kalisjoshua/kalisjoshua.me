const DELAY = 300;
let taskRunning = false;
const watched = ["admin", "content", "public", "sanguine"];

for await (const { paths } of Deno.watchFs(watched)) {
  if (!taskRunning) {
    taskRunning = true;
    console.log("Change detected.", ...paths);

    const command = new Deno.Command(Deno.execPath(), {
      args: ["task", "build"],
      stdin: "piped",
    });

    const child = command.spawn();

    // manually close stdin
    child.stdin.close();

    await child.status;

    setTimeout(() => {
      taskRunning = false;
    }, DELAY);
  }
}
