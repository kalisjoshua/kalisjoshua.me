import { join, loadSync } from "../deno.deps.ts";

import { command, deno } from "./command.ts";

const ENV = loadSync();

const COV_DIR = ENV["COV_DIR"];
const LCOV = join(COV_DIR, "lcov");
const SRC_DIR = ENV["SRC_DIR"];
const THRESHOLD = parseInt(ENV["THRESHOLD"], 10);

function checkCoverage() {
  const [sumTotal, denominator] = deno(`coverage ${COV_DIR}`)
    .split(/\n/)
    .reduce((acc, line) => {
      if (/^cover/.test(line)) {
        acc[0] = acc[0] + parseFloat(line.match(/\d+\.\d+/)?.at(0) || "");
        acc[1] = acc[1] + 1;
      }

      return acc;
    }, [0, 0] as Array<number>)
  const coverage = parseFloat((sumTotal / denominator).toFixed(3));
  const exitCode = coverage < THRESHOLD ? 1 : 0;
  const message = ` Coverage threshold (${THRESHOLD})${exitCode ? " NOT" : ""} achieved: ${coverage}.`;
  const stars = `\n${Array(message.length + 2).fill(null).join("*")}\n`;

  console.info(`\n${stars}${message}${stars}\n`);

  return exitCode;
}

// 1. start clean
// deno-lint-ignore no-empty no-unused-vars
try { Deno.removeSync(COV_DIR, { recursive: true }); } catch (e) {}

// 2. run tests collecting code coverage statistics
console.log(deno(`test --allow-read=. --coverage=${COV_DIR} ${SRC_DIR}`));

// 3. create lcov report
deno(`coverage ${COV_DIR} --lcov --output=${LCOV}`);

// 4. generate the html files from the lcov report
command("genhtml", `-o ${COV_DIR} ${LCOV}`);

// 5. collect the coverage percentages for all tested units
Deno.exit(checkCoverage());
