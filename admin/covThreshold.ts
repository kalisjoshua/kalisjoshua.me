const [THRESHOLD, ...args] = Deno.args;
const count = args.length;

const pattern = /(\d+\.\d+)%$/;
const sum = args
  .map((s) => parseInt(s.match(pattern)?.[1] || "0", 10))
  .reduce((a, b) => a + b, 0);

const average = sum / count;
const exitCode = average >= parseInt(THRESHOLD, 10) ? 0 : 1;
const message = exitCode ? `not achieved.` : `achieved or exceeded`;

console.info(
  "\n\n*****************************************************\n",
  `Coverage threshold (${THRESHOLD}) ${message}: ${average}.`,
  "\n*****************************************************\n\n"
);

Deno.exit(exitCode);
